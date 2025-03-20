import type React from "react"
import { cn } from "@/lib/utils"

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white",
        "bg-gradient-to-b from-[#171717] to-[#242424] rounded-full cursor-pointer",
        "shadow-[0_2px_4px_rgba(0,0,0,1),0_10px_20px_rgba(0,0,0,0.4)]",
        "transition-all duration-200 ease-in-out",
        "border border-[#292929]",
        "before:content-[''] before:absolute before:inset-[-1px] before:bg-gradient-to-b before:from-[#292929] before:to-black",
        "before:z-[-1] before:rounded-full before:transition-all before:duration-200 before:ease-in-out before:opacity-100",
        "active:translate-y-0.5 active:shadow-[0_1px_2px_rgba(0,0,0,1),0_5px_10px_rgba(0,0,0,0.4)]",
        className,
      )}
      {...props}
    >
      {children}
      <span className="relative flex items-center justify-center w-10 h-10 ml-2 rounded-full bg-gradient-to-b from-[#171717] to-[#242424] shadow-[0_0_1px_rgba(0,0,0,1)] border border-[#252525] transition-all duration-200 ease-in-out">
        <svg
          id="Arrow"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 transition-all duration-400 ease-in-out hover:rotate-[-35deg] filter drop-shadow-[0_10px_20px_rgba(26,25,25,0.9)] hover:drop-shadow-[0_10px_20px_rgba(50,50,50,1)]"
        >
          <defs>
            <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient">
              <stop style={{ stopColor: "#FFFFFF", stopOpacity: 1 }} offset="0%" />
              <stop style={{ stopColor: "#AAAAAA", stopOpacity: 1 }} offset="100%" />
            </linearGradient>
          </defs>
          <path
            fill="url(#iconGradient)"
            d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
          />
        </svg>
      </span>
    </button>
  )
}

export default StyledButton

