import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

interface SideButtonProps {
  children: React.ReactNode
  href: string
}

const SidebarButton = ({ href, children }: SideButtonProps) => {
  const pathname = usePathname()
  return (
    <Button
      variant={pathname === href ? 'selected' : 'ghost'}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default SidebarButton
