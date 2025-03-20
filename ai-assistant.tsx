"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Bot } from "lucide-react"

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ type: "user" | "ai"; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      { type: "user", content: input },
      { type: "ai", content: "I am processing your request..." },
    ]
    setMessages(newMessages)
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages.slice(0, -1),
        {
          type: "ai",
          content: `Thank you for your question about "${input}". I'm here to help with any information about Ejisuman Senior High School.`,
        },
      ])
    }, 1000)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0">
        <Bot className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>School Assistant</DialogTitle>
          </DialogHeader>
          <div className="h-[400px] overflow-y-auto space-y-4 p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${
                  msg.type === "user"
                    ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                    : "bg-muted max-w-[80%]"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about admissions, programs, facilities..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

