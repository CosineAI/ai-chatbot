'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconArrowDown } from '@/components/ui/icons'
import { useEffect } from 'react'

export interface ButtonScrollToBottomProps extends ButtonProps {
  scrollRef?: React.RefObject<HTMLElement>
}

export function ButtonScrollToBottom({ scrollRef, className, ...props }: ButtonScrollToBottomProps) {
  const isAtBottom = useAtBottom(scrollRef)
  return (
    <>
    {<Button
      variant="outline"
      size="icon"
      className={cn("transition-opacity duration-300", {
        'opacity-0 pointer-events-none': isAtBottom,
        'opacity-100 pointer-events-auto': !isAtBottom
      }, className)}
      onClick={() => (scrollRef?.current ?? window).scrollTo({
          top: scrollRef?.current?.offsetHeight ?? document.body.offsetHeight,
          behavior: 'smooth'
        })
      }
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button> }
    </>
  )
}
