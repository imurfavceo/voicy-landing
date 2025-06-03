"use client"

import dynamic from "next/dynamic"

const PhoneInput = dynamic(() => import("react-phone-input-2"), { ssr: false })

type Props = {
  value: string
  onChange: (val: string) => void
}

export default function IntlPhoneInput({ value, onChange }: Props) {
  return (
    <PhoneInput
      country="us"
      value={value}
      onChange={onChange}
      enableSearch
      placeholder="+1 555-555-5555"
      inputClass="w-full !h-12 !text-base"
      buttonClass="!bg-transparent"
    />
  )
} 