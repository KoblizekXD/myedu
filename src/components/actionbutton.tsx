import Link from "next/link";
import { ReactNode } from "react";
import { getProviders, signIn } from "next-auth/react";

interface ActionButtonProps {
  children: ReactNode;
  className?: string;
  onClick: Function;
}

export default function ActionButton({
  children,
  className,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`${className} w-[270px] rounded border text-white text-center py-3 px-3`}
    >
      {children}
    </button>
  );
}
