"use client";

import { useEffect } from "react";
import chatService from "@/services/chat.service";
import { useChatStore } from "@/store/chat.store";

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setConversations } = useChatStore();

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    try {
      const conversations =
        await chatService.getConversations();

      setConversations(conversations);
    } catch (error) {
      console.error(error);
    }
  }

  return <>{children}</>;
}