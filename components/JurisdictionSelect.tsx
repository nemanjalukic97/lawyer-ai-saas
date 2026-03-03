'use client'

import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function JurisdictionSelect() {
  const [value, setValue] = useState<string>("serbia")

  return (
    <>
      <Select
        value={value}
        onValueChange={(v) => setValue(v)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select country / jurisdiction" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="serbia">Serbia</SelectItem>
          <SelectItem value="croatia">Croatia</SelectItem>
          <SelectItem value="bih_fbih">
            Bosnia &amp; Herzegovina - Federation
          </SelectItem>
          <SelectItem value="bih_rs">
            Bosnia &amp; Herzegovina - Republika Srpska
          </SelectItem>
          <SelectItem value="bih_brcko">
            Bosnia &amp; Herzegovina - Brcko District
          </SelectItem>
          <SelectItem value="montenegro">Montenegro</SelectItem>
          <SelectItem value="slovenia">Slovenia</SelectItem>
        </SelectContent>
      </Select>

      <input type="hidden" name="jurisdiction" value={value} />
    </>
  )
}
