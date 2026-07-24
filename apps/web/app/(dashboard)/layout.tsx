import ChatProvider from "@/providers/ChatProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      {children}
    </ChatProvider>
  );
}