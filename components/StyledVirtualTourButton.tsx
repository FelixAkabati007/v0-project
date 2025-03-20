"use client"

import type React from "react"
import { cn } from "@/lib/utils"

const StyledVirtualTourButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        "relative px-8 py-4 text-lg font-bold text-white bg-gradient-to-b from-gray-800 to-gray-900",
        "rounded-full cursor-pointer shadow-lg shadow-black/50",
        "transition-all duration-200 ease-in-out",
        "border border-gray-700 hover:border-gray-600",
        "flex items-center justify-center",
        "before:content-[''] before:absolute before:inset-0.5 before:bg-gradient-to-b before:from-gray-700 before:to-black before:rounded-full before:z-[-1] before:opacity-100 before:transition-all before:duration-200",
        "active:translate-y-0.5 active:shadow-md active:shadow-black/30",
        className,
      )}
      {...props}
    >
      Virtual Tour
      <span className="relative flex items-center justify-center w-10 h-10 ml-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full shadow-sm border border-gray-700">
        <svg
          id="Arrow"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 transition-all duration-400 ease-in-out hover:rotate-[-35deg] filter drop-shadow-lg"
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

export default StyledVirtualTourButton

