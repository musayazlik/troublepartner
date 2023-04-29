import React from "react";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-2 font-medium text-xs bg-slate-100">
      <div className="copy flex gap-1">
        &copy; 2023 -
        <a
          href="https://musayazlik.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Musa Yazlık
        </a>
        -<p>Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
