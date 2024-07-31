"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrainCircuit, SendIcon, User } from "lucide-react";
import { useChat } from "ai/react";
import { fetchAuthSession } from "aws-amplify/auth";

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 bg-slate-300 rounded-full">
        <User size={28} />
      </div>
      <div className="bg-muted rounded-lg p-4 max-w-[75%]">{children}</div>
    </div>
  );
}

function AiMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 justify-end">
      <div className="bg-primary text-primary-foreground rounded-lg p-4 max-w-[75%]">
        {children}
      </div>
      <div className="p-2 bg-slate-300 rounded-full">
        <BrainCircuit size={28} />
      </div>
    </div>
  );
}
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `${process.env.NEXT_PUBLIC_API_URL}/chat`,
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const authToken = await fetchAuthSession();
    if (!authToken.tokens?.idToken) {
      return;
    }
    handleSubmit(e, {
      headers: {
        Authorization: `Bearer ${authToken.tokens.idToken.toString()}`,
      },
    });
  };
  return (
    <>
      <div className="flex-1  h-[83vh] overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => {
          if (message.role === "user") {
            return <UserMessage key={index}>{message.content}</UserMessage>;
          } else {
            return <AiMessage key={index}>{message.content}</AiMessage>;
          }
        })}
      </div>
      <form
        onSubmit={onSubmit}
        className="bg-muted px-6 py-4 flex items-center gap-2 fixed bottom-0 w-full max-w-2xl"
      >
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1"
          value={input}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <Button type="submit" size="icon">
          <SendIcon className="w-4 h-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </>
  );
}
