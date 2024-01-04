
import 'material-icons/iconfont/material-icons.css'

interface TopInfoProps {
    message: string;
}


export default function TopInfo({ message }: TopInfoProps) {
    return (
        <div className={`absolute rounded py-3 flex align-middle px-2 gap-2 top-2 left-1/2 transform -translate-x-1/2 w-auto h-auto bg-green-500`}>
            <span className={'material-icons'}>info</span>
            <p className={'text-white font-bold'}>{message}</p>
        </div>
    )

}