import type React from "react"
import { Loader2, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FullScreenLoaderProps {
  text?: string
  className?: string
  iconClassName?: string
  textClassName?: string
  icon?: React.ReactNode
}

export function OtpAnimation({
  text = "Sending OTP...",
  className,
  iconClassName,
  textClassName,
  icon,
}: FullScreenLoaderProps) {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-xl", className)}>
      <div className="relative flex flex-col items-center justify-center gap-6 p-10 rounded-xl bg-background/90 border shadow-2xl">
        <div className={cn("relative flex items-center justify-center", iconClassName)}>
          {icon ? (
            icon
          ) : (
            <>
              <Loader2 className="size-16 animate-spin text-[#7848F4]" />
              <Zap className="absolute -right-3 -top-3 size-6 animate-pulse text-[#7848F4]" />
            </>
          )}
        </div>
        {text && <p className={cn("text-lg font-semibold text-[#7848F4]", textClassName)}>{text}</p>}
      </div>
    </div>
  )
}
