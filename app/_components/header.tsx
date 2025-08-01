import React from 'react'
import { cn } from '../_lib/utils'

export const HeaderTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>
}

export const HeaderSubtitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-xs font-semibold text-slate-500">{children}</span>
  )
}

export const HeaderLeft = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-1">{children}</div>
}

export const HeaderRight = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}
const Header = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {children}
    </div>
  )
}

export default Header
