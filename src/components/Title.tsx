import localFont from "next/font/local";
import type React from "react";

const font = localFont({
  src: "../../public/fonts/Minercraftory.ttf",
  display: "swap",
});
export default function Title({
  children,
  className,
}: {
  children: string | React.ReactNode;
  className?: string;
}) {
  return <h1 className={font.className + " " + className}>{children}</h1>;
}
