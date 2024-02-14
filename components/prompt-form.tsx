import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { IconPlus, IconArrowUp, Square, IconStop } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'
import { HTMLProps, useEffect, useRef } from 'react'

export type PromptProps = Pick<UseChatHelpers, 'input' | 'setInput' | "stop"> & Pick<HTMLProps<HTMLTextAreaElement>, "placeholder"> & {
  onSubmit: (value: string) => void
  isLoading: boolean
}

export function PromptForm({
  placeholder,
  onSubmit,
  input,
  setInput,
  stop,
  isLoading,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex flex-col w-full px-2 overflow-hidden max-h-60 grow sm:rounded-md sm:px-3">
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={e => {
                e.preventDefault()
                router.refresh()
                router.push('/')
              }}
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'absolute left-0 top-4 size-8 rounded-full bg-background p-0 sm:left-4'
              )}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip> */}
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder ?? 'Send a message...'}
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              {isLoading ? 
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className='size-8 p-0 rounded-full'
                  onClick={() => stop()}
                >
                  <IconStop className='size-8' />
                  <span className="sr-only">Stop</span>
                </Button> 
              : <Button
                  type="submit"
                  size="icon"
                  className='size-8 p-0'
                  disabled={input === ''}
                >
                <IconArrowUp className='size-5' />
                <span className="sr-only">Send message</span>
              </Button>}
            </TooltipTrigger>
            <TooltipContent>{isLoading ? "Stop" : "Send message"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
