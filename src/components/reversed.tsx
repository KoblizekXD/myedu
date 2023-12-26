import { ReactNode } from "react";

interface ReversedProps {
    children: ReactNode
    direction?: string
}

export default function Reversed({children, direction = "l"}: ReversedProps) {
    return (
        <div className={`ml-auto flex gap-4`}>
            {children}
        </div>
    )
}