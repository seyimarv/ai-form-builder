"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WandIcon } from "lucide-react";
import { FormPreview } from "@/components/form-preview";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";

interface FormSchema {
  name: string;
  description: string;
  fields: Array<{
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    required: boolean;
    options?: string[];
  }>;
}

export default function CreateFormPage() {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat/form-builder",
    }),
    onFinish: (options) => {
      try {
        // Try to extract form schema from AI response
        const textParts = options.message.parts.filter(part => part.type === "text");
        for (const part of textParts) {
          const schemaMatch = part.text?.match(/```json\n([\s\S]*?)\n```/);
          if (schemaMatch) {
            const schema = JSON.parse(schemaMatch[1]);
            setFormSchema(schema);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to parse form schema:", error);
      }
    },
  });

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    if (!hasText) return;

    sendMessage({ text: message.text! });
  };

  const examplePrompts = [
    "Create a customer feedback form with rating and comments",
    "Build a job application form with file upload",
    "Make an event registration form with multiple choice questions",
    "Design a contact form with validation",
  ];

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Form with AI
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Describe your form needs in natural language and watch AI build it for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Chat Interface */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">AI</span>
                </div>
                AI Form Builder
              </CardTitle>
              <CardDescription>
                Tell me what kind of form you need and I'll create it for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex flex-col">
                <Conversation className="flex-1">
                  <ConversationContent>
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        <WandIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-sm">Start a conversation to create your form</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div key={message.id}>
                          {message.parts.map((part, i) => {
                            if (part.type === "text") {
                              return (
                                <Message key={`${message.id}-${i}`} from={message.role}>
                                  <MessageContent>
                                    <Response>{part.text}</Response>
                                  </MessageContent>
                                </Message>
                              );
                            }
                            return null;
                          })}
                        </div>
                      ))
                    )}
                    {status === "streaming" && <Loader />}
                  </ConversationContent>
                  <ConversationScrollButton />
                </Conversation>

                <div className="mt-4">
                  <PromptInput onSubmit={handleSubmit}>
                    <PromptInputBody>
                      <PromptInputTextarea placeholder="Describe the form you want to create..." />
                    </PromptInputBody>
                    <PromptInputToolbar>
                      <PromptInputTools />
                      <PromptInputSubmit status={status} />
                    </PromptInputToolbar>
                  </PromptInput>
                </div>
              </div>

              {/* Example Prompts */}
              {messages.length === 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Try these examples:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((prompt, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => sendMessage({ text: prompt })}
                      >
                        {prompt}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Form Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>
                Live preview of your AI-generated form
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formSchema ? (
                <FormPreview schema={formSchema} />
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <WandIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p>Form preview will appear here after AI generates it</p>
                </div>
              )}
            </CardContent>
          </Card>

          {formSchema && (
            <div className="mt-4 flex space-x-2">
              <Button className="flex-1">Save as Draft</Button>
              <Button variant="outline" className="flex-1">Publish Form</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
