'use client'

import { RefObject, useRef } from 'react'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
type OverlayProps = {
  children: React.ReactNode
  handleVisible: (visible: boolean) => void
}
export default function Overlay({ children, handleVisible }: OverlayProps) {
  const ovelayCss =
    'fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'

  const ref: RefObject<HTMLElement> = useRef() as RefObject<HTMLElement>

  useOnClickOutside(ref, () => {
    handleVisible(false)
  })
  return (
    <div className={ovelayCss}>
      <div ref={ref as RefObject<HTMLDivElement>}>{children}</div>
    </div>
  )
}
