import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-[#F4511E] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_18px_rgba(244,81,30,0.25)] hover:bg-[#FF612D] hover:shadow-[0_0_28px_rgba(244,81,30,0.28)]",
        destructive:
          "bg-[#EF4444] text-white hover:bg-[#dc2626]",
        outline:
          "border border-white/15 bg-[#17171C] text-white hover:border-white/25 hover:bg-[#202028]",
        secondary:
          "bg-[#1D1D24] text-white border border-white/10 hover:bg-[#252530]",
        ghost:
          "text-[#B3B3BA] hover:bg-white/10 hover:text-white",
        link: "text-[#FF7A4D] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-9 rounded-xl gap-1.5 px-4",
        lg: "h-11 rounded-2xl px-7",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-xl",
        "icon-lg": "size-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
