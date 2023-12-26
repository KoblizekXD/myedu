import Link from "next/link";
import { ReactNode } from "react";
import { getProviders, signIn } from "next-auth/react"

interface ButtonProps {
    children: ReactNode
    bg?: string
    href: string
    className?: string
    onClick: Function
}

export default function Button({children, className, href, bg = "transparent", onClick}: ButtonProps) {
    return (
        <button onClick={onClick()} className={`${className} w-[270px] rounded border text-white text-center py-3 px-3`}>
            {children}
        </button>
    )
}