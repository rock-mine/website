"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
  href?: string;
  isActive?: boolean;
  isactive?: boolean;
  className?: string;
  variant?: "link" | "default";
  text?: string;
}

export default function Button({
  className,
  variant = "default",
  isActive,
  isactive,
  href,
  text,
  children,
  ...props
}: ButtonProps) {
  const active = isActive || isactive;
  const commonClasses = twMerge(
    `hover:shadow-hovershadow shadow-blueshadow shadow-xl
     hover:text-bluetext transition-colors duration-300
     border-4 border-blueborder text-center py-2 px-4
     font-bold flex flex-grow justify-center items-center
     ${active ? "bg-blueselected" : "bg-black/20 bg-bluebg"}`,
    className || ""
  );

  if (variant === "link" && href) {
    return (
      <Link href={href} className={commonClasses}>
        {children || text}
      </Link>
    );
  }

  return (
    <button className={commonClasses} type={props.type || "button"} {...props}>
      {children || text}
    </button>
  );
}
