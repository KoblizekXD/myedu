import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode
    bg?: string
    href: string
}

export default function Button({children, href, bg = "transparent"}: ButtonProps) {
    return (
        <Link href={href} className={`w-[270px] rounded border text-white bg-${bg} text-center py-3 px-3`}>
            {children}
        </Link>
    )
}