"use client";
import React from "react";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

function DashboardSidebar() {
  const menu = [
    {
      text: "Dashboard Home",
      icon: <Icon icon="heroicons-outline:home" width="20" />,
      href: "/dashboard",
    },
  ];

  return (
    <aside className="h-screen max-h-screen border-r border-solved-color flex flex-col">
      <div key="logo" className="w-full h-[65px] flex justify-center items-center border-b border-solved-color">
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-primary">
            <path fill="currentColor" d="M13 9V4H6v16h12V9zm-2.06 9L7.4 14.46l1.41-1.41l2.12 2.12l4.24-4.24l1.41 1.41z" opacity="0.3" />
            <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5zm-9.18-6.95L7.4 14.46L10.94 18l5.66-5.66l-1.41-1.41l-4.24 4.24z" />
          </svg>
        </a>
      </div>

      <div className="sidebar-menu-list w-full flex flex-col gap-4 py-4">
        {menu.map((item, i) => (
          <div className="tooltip tooltip-right" data-tip={item.text} key={i}>
            <div className="sidebar-menu-item w-full flex justify-center">
              <Link href={item.href} className="btn btn-square">
                {/* {item.text} */}
                {item.icon}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default DashboardSidebar;
