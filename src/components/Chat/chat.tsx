"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrainCircuit, SendIcon } from "lucide-react";
import { useChat } from "ai/react";
import { fetchAuthSession } from "aws-amplify/auth";
import Markdown from "react-markdown";

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start justify-end">
      <div className="bg-muted px-4 py-3 max-w-[75%] rounded-3xl">
        {content}
      </div>
    </div>
  );
}

function AiMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-1 justify-start">
      <div className="p-2 bg-slate-300 rounded-full">
        <BrainCircuit size={28} />
      </div>
      <div className="rounded-lg p-2 max-w">
        <Markdown>{content}</Markdown>
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
      <div className="flex-1  h-[83vh] overflow-y-auto p-6 space-y-3">
        {messages.map((message, index) => {
          if (message.role === "user") {
            return <UserMessage key={index} content={message.content} />;
          } else {
            return <AiMessage key={index} content={message.content} />;
          }
        })}
      </div>
      <form
        onSubmit={onSubmit}
        className="px-6 py-4 flex items-center gap-2 fixed bottom-0 w-full max-w-2xl"
      >
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1 bg-muted"
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
