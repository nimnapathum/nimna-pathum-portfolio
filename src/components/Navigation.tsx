"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/?skip-loading=true", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/?skip-loading=true#about", label: "About" },
    { href: "/?skip-loading=true#contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/?skip-loading=true") {
      return pathname === "/";
    }
    return pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/?skip-loading=true" 
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Nimna Pathum
          </Link>
          
          <nav className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;