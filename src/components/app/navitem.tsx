import Link from "next/link";
import { ReactNode } from "react";
import 'material-symbols';

interface NavItemProps {
  href?: string;
  children: ReactNode;
  selected?: boolean;
  icon?: string;
  className?: string;
  materialClass?: string;
  onClick?: () => void;
}

export default function NavItem({ href, onClick, children, className, materialClass, selected, icon }: NavItemProps) {
  return (
    <div className={"flex items-center"}>
      {
        href ? (
          <>
            <Link className={`flex ${className} py-4 text-md flex gap-2 pl-2 text-white w-full`} onClick={onClick} href={href}>
              <span className={`material-symbols-outlined ${materialClass}`}>{icon}</span>
              <div className={'font-semibold'}>{children}</div>
              { selected && <div className={'h-[auto] border border-red-400 rounded ml-auto'}></div>}
            </Link>
          </>
        ) : (
          <div onClick={onClick} className={`${className} py-4 text-md cursor-pointer select-none flex gap-2 pl-2 text-white w-full`}>
            <span className={`material-icons ${materialClass}`}>{icon}</span>
            {children}
            { selected && <div className={'h-[auto] border border-red-400 rounded ml-auto'}></div>}
          </div>
        )
      }
    </div>
  );
}
