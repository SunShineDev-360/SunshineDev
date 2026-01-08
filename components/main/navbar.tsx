'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";
import { urlFor } from "@/lib/sanity/image";
import { getIcon } from "@/lib/sanity/iconMap";

type NavbarProps = {
  navbarData?: {
    name?: string;
    logo?: {
      asset?: { url?: string };
      alt?: string;
    };
    navLinks?: Array<{ title: string; link: string }>;
    socialLinks?: Array<{ 
      name: string; 
      iconName?: string; 
      icon?: {
        asset?: { url?: string };
        alt?: string;
      };
      link: string 
    }>;
    sourceCodeLink?: string;
  } | null;
};

export const Navbar = ({ navbarData }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use Sanity data if available, fallback to constants
  const name = navbarData?.name || "John Doe";
  const logoUrl = navbarData?.logo?.asset?.url 
    ? urlFor(navbarData.logo).width(70).height(70).url() 
    : "/logo.png";
  const logoAlt = navbarData?.logo?.alt || "Logo";
  const navLinks = navbarData?.navLinks || NAV_LINKS;
  // Map SOCIALS to the format expected by the component
  const socialLinksData = navbarData?.socialLinks;
  const socialLinks = socialLinksData || SOCIALS.map(s => {
    // Map component name to icon name string
    const iconComponentName = s.icon.name || '';
    // Simple mapping - component names match icon names in most cases
    const iconName = iconComponentName || 'RxInstagramLogo';
    return { 
      name: s.name, 
      iconName, 
      link: s.link 
    };
  });
  const sourceCodeLink = navbarData?.sourceCodeLink || LINKS.sourceCode;

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link
          href="#about-me"
          className="flex items-center"
        >
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={70}
            height={70}
            draggable={false}
            className="cursor-pointer rounded-full"
          />
          <div className="hidden md:flex md:selffont-bold ml-[10px] text-gray-300">{name}</div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
              >
                {link.title}
              </Link>
            ))}

            {/* Source Code */}
            <Link
              href={sourceCodeLink}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
            >
              Source Code
            </Link>
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {socialLinks.map(({ link, name, iconName, icon }) => {
            // Prioritize uploaded icon image if available
            if (icon?.asset?.url) {
              const iconUrl = urlFor(icon).width(24).height(24).url();
              return (
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={name}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={iconUrl}
                    alt={icon.alt || name}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                </Link>
              );
            }
            
            // Fallback to React icon component
            const Icon = iconName ? getIcon(iconName) : null;
            // Fallback to original SOCIALS if icon not found
            const fallbackIcon = !Icon && !socialLinksData ? SOCIALS.find(s => s.name === name)?.icon : null;
            const FinalIcon = Icon || fallbackIcon;
            
            if (!FinalIcon) return null;
            
            return (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
              >
                <FinalIcon className="h-6 w-6 text-white" />
              </Link>
            );
          })}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] p-5 flex flex-col items-center text-gray-300 md:hidden">
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href={sourceCodeLink}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Source Code
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {socialLinks.map(({ link, name, iconName, icon }) => {
              // Prioritize uploaded icon image if available
              if (icon?.asset?.url) {
                const iconUrl = urlFor(icon).width(32).height(32).url();
                return (
                  <Link
                    href={link}
                    target="_blank"
                    rel="noreferrer noopener"
                    key={name}
                    className="flex items-center justify-center"
                  >
                    <Image
                      src={iconUrl}
                      alt={icon.alt || name}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </Link>
                );
              }
              
              // Fallback to React icon component
              const Icon = iconName ? getIcon(iconName) : null;
              const fallbackIcon = !Icon && !socialLinksData ? SOCIALS.find(s => s.name === name)?.icon : null;
              const FinalIcon = Icon || fallbackIcon;
              
              if (!FinalIcon) return null;
              
              return (
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={name}
                >
                  <FinalIcon className="h-8 w-8 text-white" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};