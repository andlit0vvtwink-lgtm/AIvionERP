import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground flex min-h-20 w-full rounded-[14px] border border-white/10 bg-[#1D1D24] px-3 py-2 text-sm text-white shadow-none transition-[color,box-shadow,border-color] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-[#F4511E]/60 focus-visible:ring-[3px] focus-visible:ring-[#F4511E]/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
