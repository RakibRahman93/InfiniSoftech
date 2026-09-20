# Seedance video example

Requires Node.js 22.6+ (the project environment currently uses Node.js 25).
Install dependencies with `npm install`.

Edit `.env.local` locally and set `HF_CREDENTIALS=key-id:key-secret` using your
actual credentials. This file is ignored by Git. Never paste credentials into
chat, commit them, or use a `NEXT_PUBLIC_` variable. The CLI loads credentials at
runtime; do not import `index.ts` into the web application.

Run `npm run higgsfield:generate` from the project root. Each run submits a
billable request for “A cinematic scene at sunset”, 5 seconds, 720p, 16:9.
The example prints a video URL only after completion and exits nonzero on errors,
cancellation, moderation, missing output, or a polling timeout.

The official SDK's `subscribe` submits the request with automatic submission
retries disabled. SDK 0.2.6's automatic polling does not terminate on `canceled`,
so the example polls the documented status endpoint itself for up to 20 minutes.
A timeout or network failure does not cancel a remote generation. Check the
console before rerunning to avoid duplicate charges.

References: [official SDK documentation](https://docs.higgsfield.ai/docs/how-to/sdk)
and [Seedance 2.5 model reference](https://console.higgsfield.ai/models/bytedance/seedance-2.5/text-to-video/api-reference).
