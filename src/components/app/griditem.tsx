interface GridItemProps {
  children: React.ReactNode
  className?: string
}

export default function GridItem({ children, className }: GridItemProps) {
  return (
    <div className={`rounded-lg border-[#313537] border ${className}`}>
      {children}
    </div>
  )
}
