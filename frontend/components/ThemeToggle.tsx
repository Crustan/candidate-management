import {useEffect, useState} from "react";

function getInitialTheme(): "light" | "dark" {
  if (
    window.matchMedia("prefers-color-theme: dark") ||
    document.documentElement.getAttribute("data-theme") === "dark"
  ) {
    return "dark";
  }
  return "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function switchTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <button className="theme-toggle" title="Toggle theme" onClick={switchTheme}>
      {theme === "dark" ? (
        <svg className="sun" width="32" height="32" viewBox="0 0 32 32">
          <g transform="translate(-4 -3)">
            <rect width="32" height="32" fill="none" />
            <path d="M23.0000077,15.51 C22.9944792,19.0985439 20.0818899,22.0036757 16.4933436,22 C12.9047973,21.9963174 9.99817109,19.0852195 10.0000077,15.4966718 C10.001846,11.9081241 12.9114518,9 16.5000077,9 C18.2256412,9 19.8804589,9.68618996 21.0997332,10.9073401 C22.3190076,12.1284902 23.0026548,13.7843608 23.0000077,15.51 Z M17,3 L16,3 L16,7 L17,7 L17,3 Z M25.7,7 L25,6.3 L22.17,9.13 L22.88,9.84 L25.7,7 Z M25,15 L25,16 L29,16 L29,15 L25,15 Z M22.17,21.86 L25,24.69 L25.7,24 L22.87,21.17 L22.17,21.86 Z M16,28 L17,28 L17,24 L16,24 L16,28 Z M7.32,24 L8.03,24.71 L10.86,21.88 L10.15,21.17 L7.32,24 Z M8,15 L4,15 L4,16 L8,16 L8,15 Z M10.85,9.13 L8,6.3 L7.32,7 L10.15,9.84 L10.85,9.13 Z" />
          </g>
        </svg>
      ) : (
        <svg className="moon" width="32" height="32" viewBox="0 0 32 32">
          <g transform="translate(-3 -2)">
            <rect width="32" height="32" fill="none" />
            <path d="M29.8352293,18.8144088 L29.8352293,18.8144088 C29.6499239,18.6859925 29.4042806,18.6859925 29.2189752,18.8144088 L29.2189757,18.8144085 C23.7662616,22.1520183 16.6374443,20.4420762 13.2962656,14.9951404 C11.018547,11.2818851 11.0217256,6.60536713 13.3044883,2.8952546 L13.3044883,2.8952546 C13.5008939,2.6706438 13.4778352,2.32951182 13.2529857,2.13331473 C13.0975956,1.99772616 12.8784934,1.96232052 12.6882341,2.04205464 L12.6882344,2.04205457 C5.41096472,4.31599416 1.35694216,12.052508 3.63328771,19.3220515 C5.90964407,26.591595 13.6543803,30.6413134 20.93165,28.3673846 C25.2518727,27.0174389 28.6352161,23.6376875 29.9865966,19.3220515 L29.9865966,19.3220515 C30.0283765,19.1380562 29.9709942,18.9456197 29.835236,18.8144516 L29.8352293,18.8144088 Z" />
          </g>
        </svg>
      )}
    </button>
  );
}
