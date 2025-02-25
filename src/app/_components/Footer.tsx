import React from "react";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="py-4 md:py-6 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 md:relative md:h-10">
          <div className="text-sm text-gray-400 tracking-tighter order-2 md:order-1 md:absolute md:left-10 md:top-1/2 md:transform md:-translate-y-1/2 mt-2 md:mt-0">
            © 2025 Soumik Patra - All Rights Reserved
          </div>

          <div className="order-1 md:order-2 md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
            <Logo />
          </div>

          {/* X icon - last on mobile, right on desktop */}
          <div className="order-3 md:absolute md:right-10 md:top-1/2 md:transform md:-translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="gray"
              className="cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
