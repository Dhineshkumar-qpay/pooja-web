import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2",
    "whitespace-nowrap overflow-hidden",
    "rounded-xl text-sm font-semibold",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-saffron",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
    "motion-reduce:transition-none motion-reduce:transform-none",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-saffron to-saffron-dark",
          "text-white",
          "shadow-[0_8px_20px_-8px_rgba(194,116,24,0.7)]",
          "hover:-translate-y-0.5",
          "hover:shadow-[0_14px_28px_-10px_rgba(194,116,24,0.85)]",
          "before:absolute before:inset-0",
          "before:-translate-x-full before:bg-gradient-to-r",
          "before:from-transparent before:via-white/25 before:to-transparent",
          "before:transition-transform before:duration-700",
          "hover:before:translate-x-full",
        ].join(" "),

        primary: [
          "bg-gradient-to-r from-saffron to-saffron-dark",
          "text-white",
          "shadow-[0_8px_20px_-8px_rgba(194,116,24,0.7)]",
          "hover:-translate-y-0.5",
          "hover:shadow-[0_14px_28px_-10px_rgba(194,116,24,0.85)]",
          "before:absolute before:inset-0",
          "before:-translate-x-full before:bg-gradient-to-r",
          "before:from-transparent before:via-white/25 before:to-transparent",
          "before:transition-transform before:duration-700",
          "hover:before:translate-x-full",
        ].join(" "),

        secondary: [
          "bg-gradient-to-r from-gold to-gold-light",
          "text-text-dark",
          "shadow-[0_8px_18px_-10px_rgba(217,164,65,0.8)]",
          "hover:-translate-y-0.5",
          "hover:shadow-[0_12px_24px_-10px_rgba(217,164,65,0.9)]",
        ].join(" "),

        destructive: [
          "bg-gradient-to-r from-error to-red-700",
          "text-white",
          "shadow-md shadow-error/20",
          "hover:-translate-y-0.5",
          "hover:shadow-lg hover:shadow-error/30",
        ].join(" "),

        outline: [
          "border border-saffron/60",
          "bg-transparent text-saffron",
          "shadow-sm",
          "hover:-translate-y-0.5",
          "hover:border-saffron",
          "hover:bg-saffron hover:text-white",
          "hover:shadow-md hover:shadow-saffron/20",
        ].join(" "),

        secondaryOutline: [
          "border border-gold/70",
          "bg-transparent text-gold",
          "hover:-translate-y-0.5",
          "hover:border-gold",
          "hover:bg-gold hover:text-text-dark",
          "hover:shadow-md hover:shadow-gold/20",
        ].join(" "),

        ghost: [
          "bg-transparent text-text-secondary",
          "hover:bg-ivory-section",
          "hover:text-text-dark",
          "hover:shadow-sm",
        ].join(" "),

        link: [
          "h-auto rounded-none p-0",
          "text-saffron underline-offset-4",
          "hover:text-saffron-dark hover:underline",
        ].join(" "),
      },

      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-sm",
        xl: "h-14 rounded-2xl px-9 text-base",
        icon: "h-11 w-11 rounded-xl",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }