import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  children: ReactNode;
  selected?: boolean;
  icon?: string;
}

export default function NavItem({ href, children, selected, icon }: NavItemProps) {
  return (
    <div className={"flex items-center"}>
      <Link href={href} className={`${selected ? "border-r-sky-500 border-r-2" : ""} text-md flex gap-2 py-4 first:pl-2 text-white w-full`}>
        <span className={'material-icons'}>{icon}</span>
        {children}
      </Link>
    </div>
  );
}
