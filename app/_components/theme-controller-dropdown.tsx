"use client";
import React, { FormEvent, FormEventHandler } from "react";

export const daisyUiThemes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"];

const ThemeItem: React.FC<{ label: string; themeName: string }> = (props) => {
  async function setTheme() {
    try {
      console.log(props.label);
      await fetch("/api/theme", {
        method: "POST",
        body: JSON.stringify({ theme: props.themeName }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return <input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label={props.label} value={props.themeName} onClick={() => setTheme()} />;
};

export function ThemeList() {
  return (
    <>
      <li key="default">
        <ThemeItem label="Default" themeName="default" />
      </li>
      {daisyUiThemes.map((theme) => (
        <li key={theme}>
          <ThemeItem label={theme} themeName={theme} />
        </li>
      ))}
    </>
  );
}

function ThemeControllerDropdown() {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme{" "}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4m-4-6v3m0 3h.01" />
        </svg>
        <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 overflow-y-auto max-h-[300px]">
        <ThemeList />
      </ul>
    </div>
  );
}

export default ThemeControllerDropdown;
