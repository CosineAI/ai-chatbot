import * as React from 'react'

export function useAtBottom(ref: React.RefObject<HTMLElement> | null = null, offset: number = 0): boolean {
  const [isAtBottom, setIsAtBottom] = React.useState(false)

  React.useEffect(() => {
    if (ref) {
      const handleScroll = () => {
        if (ref.current) {
          const scrollTop = ref.current.scrollTop
          const scrollHeight = ref.current.scrollHeight
          const clientHeight = ref.current.clientHeight
          setIsAtBottom(
            clientHeight + scrollTop >= scrollHeight - offset
          )
        }
      }
  
      const node = ref.current
      if (node) {
        node.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
      }
  
      return () => {
        if (node) {
          node.removeEventListener('scroll', handleScroll)
        }
      }
    } else {
      const handleScroll = () => {
        setIsAtBottom(
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - offset
        )
      }
  
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
  
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [ref, offset])

  return isAtBottom
}
