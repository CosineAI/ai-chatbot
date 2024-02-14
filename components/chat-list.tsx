import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { Icon } from '@radix-ui/react-select'

export interface ChatList {
  messages: Message[]
  userIcon?: React.ReactNode
  assistantIcon?: React.ReactNode
}

export function ChatList({ messages, userIcon, assistantIcon }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 w-full">
      {messages.map((message, index) => {
        const last = index === messages.length - 1
        return (
          <div key={index}>
            <ChatMessage message={message} userIcon={userIcon} assistantIcon={assistantIcon} />
            {!last && (
              <Separator className="my-4 md:my-8" />
            )}
          </div>
        )
      }
    )}
    </div>
  )
}
