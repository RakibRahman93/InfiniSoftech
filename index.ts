// Server-side CLI only. Requires Node.js 22.6+.
import { config, higgsfield } from '@higgsfield/client/v2';
import { config as loadEnv } from 'dotenv';

type Generation = {
  status: string;
  request_id?: string;
  video?: { url?: string };
};

async function main() {
  loadEnv({ path: '.env.local', quiet: true });
  const credentials = process.env.HF_CREDENTIALS;
  if (!credentials || credentials === 'key-id:key-secret' || !/^[^\s:]+:[^\s:]+$/.test(credentials)) {
    console.error('Set HF_CREDENTIALS in .env.local locally using key-id:key-secret format. Never share it in chat.');
    process.exitCode = 1;
    return;
  }

  // Avoid retrying a billable submission after an ambiguous network failure.
  config({ credentials, maxRetries: 0 });
  let result: Generation = await higgsfield.subscribe('bytedance/seedance-2.5/text-to-video', {
    input: {
      prompt: 'A cinematic scene at sunset',
      duration: 5,
      resolution: '720p',
      aspect_ratio: '16:9',
    },
    // SDK 0.2.6's built-in poller omits canceled; poll the official endpoint below.
    withPolling: false,
  });

  const deadline = Date.now() + 20 * 60 * 1000;
  while (result.status === 'queued' || result.status === 'in_progress') {
    if (!result.request_id || Date.now() >= deadline) {
      console.error('Generation did not finish within the polling window. Check the Higgsfield console before submitting again.');
      process.exitCode = 1;
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(`https://api.higgsfield.ai/requests/${encodeURIComponent(result.request_id)}/status`, {
      headers: { Authorization: `Key ${credentials}` },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) {
      console.error(`Status check failed (HTTP ${response.status}). Check the Higgsfield console before submitting again.`);
      process.exitCode = 1;
      return;
    }
    result = await response.json() as Generation;
  }

  if (result.status !== 'completed') {
    const messages: Record<string, string> = {
      failed: 'Generation failed.',
      canceled: 'Generation was canceled.',
      cancelled: 'Generation was canceled.',
      nsfw: 'Generation was blocked by moderation.',
      moderated: 'Generation was blocked by moderation.',
    };
    console.error(messages[result.status] ?? 'Generation returned an unexpected status.');
    process.exitCode = 1;
    return;
  }
  const url = result.video?.url;
  if (!url || !['https:', 'http:'].includes(new URL(url).protocol)) {
    console.error('Completed response did not contain a valid video URL.');
    process.exitCode = 1;
    return;
  }
  console.log(url);
}

main().catch((error: unknown) => {
  // Never log SDK errors: network error objects can contain authorization headers.
  const status = typeof error === 'object' && error !== null && 'statusCode' in error &&
    typeof error.statusCode === 'number' ? error.statusCode : undefined;
  const responseStatus = typeof error === 'object' && error !== null && 'response' in error &&
    typeof error.response === 'object' && error.response !== null && 'status' in error.response &&
    typeof error.response.status === 'number' ? error.response.status : undefined;
  const httpStatus = status ?? responseStatus;
  console.error(httpStatus
    ? `Higgsfield request failed (HTTP ${httpStatus}). Check credentials, balance, model access, and request status in the Higgsfield console before retrying.`
    : 'Higgsfield request failed. Check credentials, connectivity, and request status in the Higgsfield console before retrying.');
  process.exitCode = 1;
});
