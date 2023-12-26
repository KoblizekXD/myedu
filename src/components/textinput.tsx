import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { ChangeEventHandler } from "react"

interface TextInputProps<E> extends InputHTMLAttributes<E> {
  placeholder?: string
  className?: string
  name: string
  // onChange?: ChangeEventHandler<E>
}

export default function TextInput({name, placeholder, className, onChange}: TextInputProps<HTMLInputElement>) {
    return (
      <input onChange={onChange} name={name} className={`p-2 border-[#1d2537] border rounded bg-transparent ${className}`} autoFocus placeholder={placeholder} autoComplete="on">
      </input>
    )
}