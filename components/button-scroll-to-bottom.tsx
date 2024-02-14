'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconArrowDown } from '@/components/ui/icons'

export interface ButtonScrollToBottomProps extends ButtonProps {
  scrollRef?: React.RefObject<HTMLElement>
}

export function ButtonScrollToBottom({ scrollRef, className, ...props }: ButtonScrollToBottomProps) {
  const isAtBottom = useAtBottom(scrollRef)
  return (
    <>
    {!isAtBottom ? <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={() => (scrollRef?.current ?? window).scrollTo({
          top: scrollRef?.current?.offsetHeight ?? document.body.offsetHeight,
          behavior: 'smooth'
        })
      }
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button> : null }
    </>
  )
}
