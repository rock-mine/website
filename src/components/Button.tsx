"use client";
import Link from "next/link";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  href?: string;
  isActive?: boolean;
  isactive?: boolean;
  className?: string;
  variant?: "link" | "default";
  text?: string;
}

export default function Button({ className, ...props }: ButtonProps) {
  return props.variant == "link" ? (
    <Link
      onClick={() => (props.onClick ? props?.onClick : null)}
      href={props.href as string}
      className={`${
        props.isActive || props.isactive ? "bg-blueselected" : ""
      } hover:shadow-hovershadow shadow-blueshadow shadow-xl hover:text-bluetext transtion-colors duration-300 bg-black/20 border-4 border-blueborder bg-bluebg text-center p-2 px-4 font-bold flex flex-grow justify-center items-center ${className}`}
    >
      {props.children || props.text}
    </Link>
  ) : (
    <button
      onClick={() => (props.onClick ? props.onClick : null)}
      className={`${
        props.isActive || props.isactive ? "bg-blueselected" : ""
      } space-x-2 hover:shadow-hovershadow shadow-blueshadow shadow-xl hover:text-bluetext transtion-colors duration-300 border-4 border-blueborder bg-black/20 text-center p-2 px-4 font-bold flex flex-grow justify-center items-center ${className}`}
      {...props}
    />
  );
}
