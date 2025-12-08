"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppWindowMacIcon, Send } from "lucide-react";
import { saveMessage } from "@/actions/project.actions";
import { format } from "date-fns";

interface Message {
  _id?: string;
  content: string;
  sender: string;
  timestamp: Date | string;
}

interface SheetInfoProps {
  project?: any;
}

export function SheetInfo({ project }: SheetInfoProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>(project?.messages || []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from project
  useEffect(() => {
    if (project?.messages) {
      setMessages(project.messages);
    }
  }, [project?.messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !project?._id) return;

    const tempMessage: Message = {
      content: message.trim(),
      sender: "You",
      timestamp: new Date(),
    };

    // Optimistically add message
    setMessages((prev) => [...prev, tempMessage]);
    const messageToSend = message.trim();
    setMessage("");
    setIsSending(true);

    try {
      const result = await saveMessage(project._id, messageToSend);
      if (!result.success) {
        // Remove optimistic message if failed
        setMessages((prev) => prev.filter((msg) => msg !== tempMessage));
        setMessage(messageToSend);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => prev.filter((msg) => msg !== tempMessage));
      setMessage(messageToSend);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date | string) => {
    if (!timestamp) return "";
    const date =
      typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    return format(date, "HH:mm");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <AppWindowMacIcon
          className="h-5 w-5 cursor-pointer text-gray hover:text-white"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        />
      </SheetTrigger>
      <SheetContent
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>{project?.name || "Project Details"}</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3 px-4 mt-4">
            {/* Project details */}
            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-300">Status</span>
              <Select defaultValue={project?.status || "todo"}>
                <SelectTrigger className="w-full" aria-label="Status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="clarification">
                    In Clarification
                  </SelectItem>
                  <SelectItem value="changes">Change Requested</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-300">Assign</span>
              <Input
                defaultValue={project?.assign || "Editor"}
                disabled
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-300">Deadline</span>
              <Input
                type="date"
                defaultValue={
                  project?.deadline
                    ? typeof project.deadline === "string"
                      ? project.deadline.split("T")[0]
                      : new Date(project.deadline).toISOString().split("T")[0]
                    : ""
                }
                disabled
                className="flex-1 max-w-xs"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-300">Organization</span>
              <Input
                defaultValue={project?.organization || "Organization"}
                disabled
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-300">Paid</span>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked={project?.paid || false}
                  disabled
                />
                <span className="text-sm text-gray-300">Paid</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-300">Videos</span>
              <Input
                type="number"
                defaultValue={project?.videos || 0}
                disabled
                className="flex-1 max-w-xs"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-32 text-sm text-gray-300">Price</span>
              <Input
                type="number"
                defaultValue={project?.price || 0}
                disabled
                className="flex-1 max-w-xs"
              />
            </div>
          </div>

          <div className="px-4">
            <div className="my-6 h-px w-full bg-white/5" />
          </div>

          {/* Chat Messages */}
          <div className="px-4 flex-1 overflow-y-auto max-h-[300px]">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No messages yet. Start the conversation!
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">
                        {msg.sender}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <div className="bg-darkgray/30 rounded-lg px-3 py-2">
                      <p className="text-white text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isSending}
            />
            <button
              onClick={handleSendMessage}
              disabled={isSending || !message.trim()}
              className="rounded bg-yellow px-4 py-2 text-white hover:bg-yellow/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
