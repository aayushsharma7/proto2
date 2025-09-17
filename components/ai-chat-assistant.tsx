"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, Sparkles, MessageCircle, BookOpen, Target, Lightbulb, Zap } from "lucide-react"

interface AIChatAssistantProps {
  className?: string
}

const quickPrompts = [
  {
    icon: MessageCircle,
    title: "Mock Interview",
    prompt:
      "Can you conduct a mock interview for a software engineering internship? Ask me technical and behavioral questions.",
    category: "Interview Prep",
  },
  {
    icon: BookOpen,
    title: "Learn React",
    prompt: "I want to learn React for my internship. Can you explain the key concepts and give me a learning roadmap?",
    category: "Technical Skills",
  },
  {
    icon: Target,
    title: "Career Guidance",
    prompt:
      "I'm confused about which career path to choose. Can you help me understand different tech roles and their requirements?",
    category: "Career Advice",
  },
  {
    icon: Lightbulb,
    title: "Soft Skills",
    prompt:
      "How can I improve my communication skills for professional settings? Give me practical tips and exercises.",
    category: "Soft Skills",
  },
  {
    icon: Zap,
    title: "Industry Trends",
    prompt: "What are the current trends in the tech industry that I should know about for internship interviews?",
    category: "Industry Knowledge",
  },
]

export function AIChatAssistant({ className }: AIChatAssistantProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/ai-chat",
  })

  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    // Use setTimeout to ensure input is set before submitting
    setTimeout(() => {
      const form = document.querySelector("form") as HTMLFormElement
      if (form) {
        form.requestSubmit()
      }
    }, 0)
  }

  return (
    <div className={className}>
      <Card className="h-[calc(100vh-10rem)] sm:h-[600px] flex flex-col w-full max-w-none">
        <CardHeader className="pb-4 px-4 sm:px-6">
          <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
            <span className="truncate">AI Learning Assistant</span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Practice skills, learn new concepts, and get career guidance
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          <ScrollArea className="flex-1 px-4 sm:px-6" ref={scrollAreaRef}>
            <div className="space-y-4 sm:space-y-6 pb-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6 sm:py-8"
                >
                  <Bot className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4 sm:mb-6" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    Welcome to your AI Learning Assistant!
                  </h3>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base px-2">
                    I'm here to help you prepare for internships, learn new skills, and advance your career.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
                    {quickPrompts.map((prompt, index) => {
                      const Icon = prompt.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <Button
                            variant="outline"
                            className="w-full h-auto p-4 sm:p-5 text-left hover:shadow-md transition-shadow bg-transparent touch-manipulation min-h-[60px]"
                            onClick={() => handleQuickPrompt(prompt.prompt)}
                          >
                            <div className="flex items-start gap-3 w-full">
                              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0 text-left">
                                <div className="font-medium text-sm sm:text-base mb-1">{prompt.title}</div>
                                <Badge variant="secondary" className="text-xs">
                                  {prompt.category}
                                </Badge>
                              </div>
                            </div>
                          </Button>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 sm:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] sm:max-w-[75%] rounded-lg px-4 py-3 sm:px-5 sm:py-4 ${
                        message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      }`}
                    >
                      <div className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
                        {message.content}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 sm:gap-4 justify-start"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3 sm:px-5 sm:py-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse text-primary" />
                      <span className="text-sm sm:text-base text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4 sm:p-6 bg-background">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything about skills, interviews, or career advice..."
                disabled={isLoading}
                className="flex-1 text-sm sm:text-base min-h-[44px]"
              />
              <Button
                type="submit"
                disabled={isLoading || !input || !input.trim()}
                size="sm"
                className="px-4 sm:px-6 min-h-[44px] min-w-[44px]"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3 text-center px-2">
              AI responses are generated and may not always be accurate. Use as guidance only.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
