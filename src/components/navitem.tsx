import Link from "next/link"
import { ReactNode } from "react"

interface NavItemProps {
    href: string,
    children: ReactNode
}

export default function NavItem({ href, children }: NavItemProps) {
    return (
        <div className={'flex items-center'}>
            <Link href={href} className={'font-bold text-lg text-white mx-2'}>{children}</Link>
        </div>
    )
}