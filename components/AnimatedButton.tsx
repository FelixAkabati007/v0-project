"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "relative w-[220px] h-[80px] rounded-[18px] overflow-hidden transform rotate-[353deg] skew-x-[4deg] text-black text-[23px] font-bold tracking-[-1px]",
        "before:content-[''] before:absolute before:inset-0 before:rounded-[20px] before:bg-white before:filter before:blur-[5px]",
        "before:transition-all before:duration-300 before:ease-in-out",
        "before:shadow-[-7px_6px_0_0_rgba(255,255,255,0.4),-14px_12px_0_0_rgba(255,255,255,0.3),-21px_18px_4px_0_rgba(255,255,255,0.25),-28px_24px_8px_0_rgba(255,255,255,0.15),-35px_30px_12px_0_rgba(255,255,255,0.12),-42px_36px_16px_0_rgba(255,255,255,0.08),-56px_42px_20px_0_rgba(255,255,255,0.05)]",
        "hover:before:opacity-70 hover:before:shadow-[-7px_6px_0_0_rgba(255,255,255,0.4),-14px_12px_0_0_rgba(255,255,255,0.25),-21px_18px_4px_0_rgba(255,255,255,0.15)]",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-[18px] overflow-hidden p-[3px] bg-gradient-to-b from-white to-gray-200 transform translate-x-[6px] -translate-y-[6px] transition-all duration-300 ease-in-out hover:translate-x-[8px] hover:-translate-y-[8px]">
        <div className="relative h-full rounded-[15px] bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center gap-4 shadow-[inset_-2px_12px_11px_-5px_#ffffff,inset_1px_-3px_11px_0px_rgba(0,0,0,0.35)] hover:shadow-[inset_-1px_12px_8px_-5px_rgba(0,0,0,0.4),inset_0px_-3px_8px_0px_#ffffff]">
          <span className="relative z-10 flex items-center justify-center">{children}</span>
          <div className="icon z-10">
            <div className="w-6 h-[3px] bg-black rounded-[1px] shadow-[-2px_2px_5px_#000000] transform scale-90 relative before:content-[''] before:absolute before:right-0 before:w-3.5 before:h-[3px] before:bg-black before:rounded-[15px] before:transform before:rotate-[44deg] before:origin-center-right before:top-[1px] before:shadow-[1px_-2px_3px_-1px_#000000] after:content-[''] after:absolute after:right-0 after:w-3.5 after:h-[3px] after:bg-black after:rounded-[15px] after:transform after:rotate-[316deg] after:origin-center-right after:bottom-[1px] after:shadow-[-2px_2px_3px_0_#000000]" />
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 342 208"
        className="absolute top-0 left-0 w-full h-full -translate-x-[17%] -translate-y-[31%] pointer-events-none"
      >
        <path
          strokeLinecap="round"
          strokeWidth={3}
          d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          strokeOpacity="0.3"
          d="M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          strokeOpacity="0.3"
          d="M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          d="M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          d="M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          strokeOpacity="0.3"
          d="M170.392 57.0278C170.392 57.0278 173.89 42.1322 169.571 29.54C165.252 16.9478 168.751 2.05227 168.751 2.05227"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          strokeOpacity="0.3"
          d="M170.392 150.948C170.392 150.948 173.89 165.844 169.571 178.436C165.252 191.028 168.751 205.924 168.751 205.924"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          d="M112.609 57.4476C112.609 57.4476 117.401 41.5051 107.125 30.4998C96.8492 19.4945 98.5 12.9998 98.5 12.9998"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          d="M112.609 150.528C112.609 150.528 117.401 166.471 107.125 177.476C96.8492 188.481 98.5 194.976 98.5 194.976"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          strokeOpacity="0.3"
          d="M62.2941 64.9917C62.2941 64.9917 55.4671 49.8089 40.4932 48.2295C25.5194 46.6501 23.7159 36.5272 23.7159 36.5272"
        />
        <path
          strokeLinecap="round"
          strokeWidth={3}
          strokeOpacity="0.3"
          d="M62.2941 145.984C62.2941 145.984 55.4671 161.167 40.4932 162.746C25.5194 164.326 23.7159 174.449 23.7159 174.449"
        />
      </svg>
    </button>
  )
}

export default AnimatedButton

