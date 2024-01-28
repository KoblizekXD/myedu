import "material-icons/iconfont/material-icons.css";

interface NotifierProps {
  message: string
  type?: 'success' | 'error'
}

export default function Notifier({message, type = 'success'}: NotifierProps) {
  return (
    <div className={`absolute flex gap-1 p-2 top-0 rounded ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <span className='material-icons-outlined'>
        {type === 'success' ? 'check' : 'cancel'}
      </span>
      {message}
      <span className='ml-4 material-icons-outlined'>
        close
      </span>
    </div>
  )
}