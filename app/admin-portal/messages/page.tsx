"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

const initialMessages = [
  { id: 1, sender: "John Doe", content: "Hello, I have a question about the upcoming exam.", timestamp: "10:30 AM" },
  { id: 2, sender: "Jane Smith", content: "When is the next parent-teacher meeting?", timestamp: "11:45 AM" },
  {
    id: 3,
    sender: "Admin",
    content: "The parent-teacher meeting is scheduled for next Friday.",
    timestamp: "12:15 PM",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "Admin",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 h-[calc(100vh-4rem)]"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[calc(100%-5rem)]">
          <div className="w-full md:w-1/3 border-r pr-4 hidden md:block">
            <Input type="search" placeholder="Search messages..." className="mb-4" />
            <ScrollArea className="h-[calc(100%-3rem)]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{message.sender}</p>
                    <p className="text-sm text-gray-500">{message.content.substring(0, 20)}...</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="w-full md:w-2/3 md:pl-4 flex flex-col">
            <ScrollArea className="flex-grow mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.sender === "Admin" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === "Admin" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-500">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

