import Link from "next/link";
import React from "react";
import { ThemeList } from "../theme-controller-dropdown";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function DashboardNavbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <div className="navbar bg-base-100 border-b border-l border-solved-color fixed top-0 right-0 w-[calc(100%-69px)] z-10">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Do The Thing</a>
      </div>
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex justify-center items-center">
              <div className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" />
                </svg>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 shadow bg-base-100 w-52 rounded-box">
              <li className="p-2 font-bold text-center mb-2">{user?.email}</li>
              <li>
                <details>
                  <summary>
                    Theme{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4m-4-6v3m0 3h.01" />
                    </svg>
                  </summary>
                  <ul className="overflow-y-auto max-h-[200px]">
                    <ThemeList />
                  </ul>
                </details>
              </li>
              <li>
                <form action={signOut}>
                  <button>Sign Out</button>
                </form>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-sm btn-secondary" href="/signin">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default DashboardNavbar;
