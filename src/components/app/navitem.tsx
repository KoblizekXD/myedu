import Link from "next/link";
import { ReactNode } from "react";
import 'material-icons/iconfont/material-icons.css'

interface NavItemProps {
  href: string;
  children: ReactNode;
  selected?: boolean;
  icon?: string;
  className?: string;
  materialClass?: string;
}

export default function NavItem({ href, children, className, materialClass, selected, icon }: NavItemProps) {
  return (
    <div className={"flex items-center"}>
      <Link href={href} className={`${selected ? "border-r-sky-300 border-r-2" : ""} ${className} py-4 text-md flex gap-2 pl-2 text-white w-full`}>
        <span className={`material-icons ${materialClass}`}>{icon}</span>
        {children}
      </Link>
    </div>
  );
}
