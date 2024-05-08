import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string; //conditional prop
}

export default function Container({ children, className }: Props) {
  return (
    <div className={`${className} max-w-screen-xl mx-auto px-4 py-4 xl:px-0`}>
      {children}
    </div>
  );
}
