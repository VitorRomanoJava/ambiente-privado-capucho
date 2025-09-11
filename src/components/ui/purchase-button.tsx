import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const purchaseButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-lg font-semibold ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-cream text-brand-text hover:bg-brand-cream-dark",
        purchase: "bg-brand-cream text-brand-text hover:bg-brand-cream-dark shadow-soft hover:shadow-hover",
      },
      size: {
        default: "h-14 px-8 py-3",
        large: "h-16 px-12 py-4 text-xl",
      },
    },
    defaultVariants: {
      variant: "purchase",
      size: "large",
    },
  }
)

export interface PurchaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof purchaseButtonVariants> {
  asChild?: boolean
}

const PurchaseButton = React.forwardRef<HTMLButtonElement, PurchaseButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(purchaseButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
PurchaseButton.displayName = "PurchaseButton"

export { PurchaseButton, purchaseButtonVariants }