import { ReactNode } from "react";

interface ReversedProps {
    children: ReactNode
}

export default function Reversed({children}: ReversedProps) {
    return (
        <div className={'ml-auto flex gap-4'}>
            {children}
        </div>
    )
}