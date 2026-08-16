import { publish } from "./bus";

export async function publishNotification(payload) {
  publish({ kind: "notification", ...payload });
  return true;
}