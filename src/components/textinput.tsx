
interface TextInputProps {
  placeholder?: string
  className?: string
}

export default function TextInput({placeholder, className}: TextInputProps) {
    return (
      <input className={`p-2 border-[#1d2537] border rounded bg-transparent ${className}`} autoFocus placeholder={placeholder} autoComplete="on">
      </input>
    )
}