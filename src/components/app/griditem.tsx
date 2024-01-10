interface GridItemProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export default function GridItem({ children, className, title }: GridItemProps) {
  return (
    <div className={`rounded-lg p-4 flex flex-col border-[#313537] border ${className}`}>
      <h2 className='text-xl font-bold'>{title}</h2>
      <div className={'grow'}> 
        {children}
      </div>
    </div>
  )
}
