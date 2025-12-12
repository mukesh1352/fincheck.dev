"use client";

import { Realtime } from "ably";

let client: Realtime | null = null;

export function getAblyClient(): Realtime {
  if (!client) {
    const key = process.env.NEXT_PUBLIC_ABLY_API_KEY;
    if (!key) throw new Error("NEXT_PUBLIC_ABLY_API_KEY is missing");

    client = new Realtime({ key });
  }
  return client;
}
