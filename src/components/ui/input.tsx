import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-white/10 h-10 w-full min-w-0 rounded-[14px] border bg-[#1D1D24] px-3 py-2 text-sm text-white shadow-none transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-[#F4511E]/60 focus-visible:ring-[3px] focus-visible:ring-[#F4511E]/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
