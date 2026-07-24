import { create } from "zustand";

export interface Conversation {
  _id: string;
  title: string;
  model?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  _id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface ChatStore {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  loading: boolean;
  typing: boolean;

  setConversations: (
    conversations: Conversation[]
  ) => void;

  addConversation: (
    conversation: Conversation
  ) => void;

  updateConversation: (
    conversation: Conversation
  ) => void;

  removeConversation: (
    conversationId: string
  ) => void;

  setActiveConversation: (
    conversation: Conversation | null
  ) => void;

  setMessages: (
    messages: Message[]
  ) => void;

  addMessage: (
    message: Message
  ) => void;

  updateLastAssistantMessage: (
    content: string
  ) => void;

  clearMessages: () => void;

  setLoading: (
    loading: boolean
  ) => void;

  setTyping: (
    typing: boolean
  ) => void;

  reset: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  /* =========================
     STATE
  ========================= */

  conversations: [],

  activeConversation: null,

  messages: [],

  loading: false,

  typing: false,

  /* =========================
     CONVERSATIONS
  ========================= */

  setConversations: (conversations) => {
  console.log("Saving conversations:", conversations);

  set({
    conversations,
  });
},

  addConversation: (conversation) =>
    set((state) => ({
      conversations: [
        conversation,
        ...(Array.isArray(state.conversations)
          ? state.conversations
          : []),
      ],
    })),

  updateConversation: (conversation) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c._id === conversation._id
          ? conversation
          : c
      ),

      activeConversation:
        state.activeConversation?._id ===
        conversation._id
          ? conversation
          : state.activeConversation,
    })),

  removeConversation: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.filter(
        (c) => c._id !== conversationId
      ),

      activeConversation:
        state.activeConversation?._id ===
        conversationId
          ? null
          : state.activeConversation,

      messages:
        state.activeConversation?._id ===
        conversationId
          ? []
          : state.messages,
    })),

  setActiveConversation: (conversation) =>
    set({
      activeConversation: conversation,
    }),

  /* =========================
     MESSAGES
  ========================= */

  setMessages: (messages) =>
    set({
      messages: Array.isArray(messages)
        ? messages
        : [],
    }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateLastAssistantMessage: (content) =>
    set((state) => {
      const messages = [...state.messages];

      for (
        let i = messages.length - 1;
        i >= 0;
        i--
      ) {
        if (messages[i].role === "assistant") {
          messages[i] = {
            ...messages[i],
            content,
          };
          break;
        }
      }

      return { messages };
    }),

  clearMessages: () =>
    set({
      messages: [],
    }),


    

  /* =========================
     UI
  ========================= */

  setLoading: (loading) =>
    set({
      loading,
    }),

  setTyping: (typing) =>
    set({
      typing,
    }),

  /* =========================
     RESET
  ========================= */

  reset: () =>
    set({
      conversations: [],
      activeConversation: null,
      messages: [],
      loading: false,
      typing: false,
    }),
}));