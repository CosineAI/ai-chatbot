import { Separator } from '@/components/ui/separator'
import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export interface ChatList {
  messages: UIState
  session?: Session
  isShared: boolean
  userIcon?: (message: Message) => React.ReactNode
  assistantIcon?: React.ReactNode
  actions?: (message: Message) => React.ReactNode
}

export function ChatList({ messages, userIcon, assistantIcon, actions }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto px-4 w-full">
      {messages.map((message, index) => {
        const last = index === messages.length - 1
        return (
          <div key={index}>
            <ChatMessage message={message} userIcon={userIcon?.(message)} assistantIcon={assistantIcon} actions={actions} />
            {!last && <Separator className="mb-4 md:mb-8" />}
          </div>
        )
      }
      )}
    </div>
  )
}
