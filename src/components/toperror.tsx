"use client";

import "material-icons/iconfont/material-icons.css";
import { useState } from "react";

interface TopErrorProps {
  error: string;
}

export default function TopError({ error }: TopErrorProps) {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div
        className={`absolute rounded py-3 flex align-middle px-2 gap-2 top-2 left-1/2 transform -translate-x-1/2 w-auto h-auto bg-red-500`}
      >
        <span className={"material-icons"}>error</span>
        <p className={"text-white font-bold"}>{error}</p>
        <span
          onClick={() => setShow(false)}
          className={"material-icons cursor-pointer select-none"}
        >
          close
        </span>
      </div>
    );
  }
}
