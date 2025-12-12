// app/lib/useRealtime.tsx
"use client";

import { useEffect } from "react";
import type { Message } from "ably";
import { getAblyClient } from "@/lib/ably";

export default function useRealtime(
  onMessage: (data: unknown) => void,
  channelName: string = process.env.NEXT_PUBLIC_ABLY_CHANNEL ?? "metrics-stream"
) {
  useEffect(() => {
    const client = getAblyClient();
    const channel = client.channels.get(channelName);

    // No 'any' → use Ably.Message type
    const handler = (msg: Message): void => {
      try {
        const raw = msg.data;
        const value = typeof raw === "string" ? JSON.parse(raw) : raw;
        onMessage(value);
      } catch (err) {
        console.error("Realtime parse error:", err);
      }
    };

    channel.subscribe("metrics", handler);

    return () => {
      channel.unsubscribe("metrics", handler);
    };
  }, [onMessage, channelName]);
}
