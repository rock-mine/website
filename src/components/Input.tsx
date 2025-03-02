import type { ComponentProps } from "react";

interface InputPropsType extends ComponentProps<"input"> {
  className?: string;
}

export default function Input({ className, ...props }: InputPropsType) {
  return (
    <input
      className={`h-10 p-3 border-3 border-blueborder bg-black/20 outline-none ${className}`}
      placeholder="Enter your text..."
      {...props}
    />
  );
}
