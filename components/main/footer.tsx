"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { FOOTER_DATA } from "@/constants";
import { getIcon } from "@/lib/sanity/iconMap";
import { urlFor } from "@/lib/sanity/image";
import { ContactForm } from "./contact-form";

type LinkType = "link" | "email" | "phone";

type FooterProps = {
  footerData?: {
    columns?: Array<{
      title: string;
      links?: Array<{
        name: string;
        type?: LinkType;
        iconName?: string;
        icon?: {
          asset?: { url?: string };
          alt?: string;
        };
        link: string;
      }>;
    }>;
    contactForm?: {
      showContactForm?: boolean;
      title?: string;
      recipientEmail?: string;
      budgetOptions?: string[];
      submitButtonText?: string;
      responseTimeText?: string;
    };
    copyrightText?: string;
  } | null;
};

type FooterColumn = {
  title: string;
  links?: Array<{
    name: string;
    type?: LinkType;
    iconName?: string | null;
    icon?: {
      asset?: { url?: string };
      alt?: string;
    };
    link: string;
  }>;
};

// Helper function to build the correct href based on link type
function buildHref(link: string, type?: LinkType): string {
  if (!type || type === "link") {
    return link;
  }
  if (type === "email") {
    // If already has mailto:, return as is
    return link.startsWith("mailto:") ? link : `mailto:${link}`;
  }
  if (type === "phone") {
    // If already has tel:, return as is
    return link.startsWith("tel:") ? link : `tel:${link}`;
  }
  return link;
}

// Helper function to get link props based on type
function getLinkProps(type?: LinkType): { target?: string; rel?: string } {
  if (!type || type === "link") {
    return { target: "_blank", rel: "noreferrer noopener" };
  }
  // Email and phone links should open in same context (mail client / phone app)
  return {};
}

// Helper function to extract raw value from link (strip mailto: and tel: prefixes)
function extractRawValue(link: string, type?: LinkType): string {
  if (type === "email") {
    return link.replace(/^mailto:/i, "");
  }
  if (type === "phone") {
    return link.replace(/^tel:/i, "");
  }
  return link;
}

// Helper function to handle copy to clipboard
async function handleCopyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!");
  } catch (error) {
    toast.error("Failed to copy to clipboard");
  }
}

export const Footer = ({ footerData }: FooterProps) => {
  const columns: FooterColumn[] = footerData?.columns || FOOTER_DATA.map((col): FooterColumn => ({
    title: col.title,
    links: col.data.map(item => ({
      name: item.name,
      type: "link" as LinkType,
      iconName: item.icon?.name || null,
      icon: undefined,
      link: item.link,
    })),
  }));
  const copyrightText = footerData?.copyrightText || `John Doe ${new Date().getFullYear()} Inc. All rights reserved.`;
  const contactForm = footerData?.contactForm;
  const showContactForm = contactForm?.showContactForm && contactForm.recipientEmail;

  return (
    <footer className="w-full bg-gradient-to-b from-[#030014] via-[#050520] to-[#030014]">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <div className="w-full px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main content: Link columns + Contact Form */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-12">
            {/* Right side: Contact Form */}
            {showContactForm && (
              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <ContactForm
                  title={contactForm.title}
                  recipientEmail={contactForm.recipientEmail!}
                  budgetOptions={contactForm.budgetOptions}
                  submitButtonText={contactForm.submitButtonText}
                  responseTimeText={contactForm.responseTimeText}
                />
              </div>
            )}
            {/* Left side: Link columns stacked vertically */}
            <div className="flex flex-col gap-8 mt-16">
              {columns.map((column) => (
                <div
                  key={column.title}
                  className="flex flex-col"
                >
                  <h3 className="font-bold text-[30px] text-white mb-4">
                    {column.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {column.links?.map((linkItem) => {
                      const { iconName, icon, name, link, type } = linkItem;
                      const isCopyable = type === "email" || type === "phone";
                      const rawValue = isCopyable ? extractRawValue(link, type) : link;
                      
                      // For email/phone types, use button with copy functionality
                      if (isCopyable) {
                        // Prioritize uploaded icon image if available
                        if (icon && icon.asset?.url) {
                          const iconUrl = urlFor(icon).width(20).height(20).url();
                          return (
                            <button
                              key={`${column.title}-${name}`}
                              onClick={() => handleCopyToClipboard(rawValue)}
                              className="flex items-center gap-2 py-2 text-gray-400 hover:text-purple-400 transition-colors group cursor-pointer"
                            >
                              <Image
                                src={iconUrl}
                                alt={icon.alt || name}
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100"
                              />
                              <span className="text-[14px]">{name}</span>
                            </button>
                          );
                        }
                        
                        // Fallback to React icon component
                        const Icon = iconName ? getIcon(iconName) : null;
                        // Fallback to original FOOTER_DATA icons
                        const fallbackIcon = !Icon && !footerData 
                          ? FOOTER_DATA.find(c => c.title === column.title)?.data.find(d => d.name === name)?.icon 
                          : null;
                        const FinalIcon = Icon || fallbackIcon;

                        return (
                          <button
                            key={`${column.title}-${name}`}
                            onClick={() => handleCopyToClipboard(rawValue)}
                            className="flex items-center gap-2 py-2 text-gray-400 hover:text-purple-400 transition-colors group cursor-pointer"
                          >
                            {FinalIcon && (
                              <FinalIcon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                            )}
                            <span className="text-[14px]">{name}</span>
                          </button>
                        );
                      }
                      
                      // For regular links, use Link component
                      const href = buildHref(link, type);
                      const linkProps = getLinkProps(type);

                      // Prioritize uploaded icon image if available
                      if (icon && icon.asset?.url) {
                        const iconUrl = urlFor(icon).width(20).height(20).url();
                        return (
                          <Link
                            key={`${column.title}-${name}`}
                            href={href}
                            {...linkProps}
                            className="flex items-center gap-2 py-2 text-gray-400 hover:text-purple-400 transition-colors group"
                          >
                            <Image
                              src={iconUrl}
                              alt={icon.alt || name}
                              width={20}
                              height={20}
                              className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100"
                            />
                            <span className="text-[14px]">{name}</span>
                          </Link>
                        );
                      }
                      
                      // Fallback to React icon component
                      const Icon = iconName ? getIcon(iconName) : null;
                      // Fallback to original FOOTER_DATA icons
                      const fallbackIcon = !Icon && !footerData 
                        ? FOOTER_DATA.find(c => c.title === column.title)?.data.find(d => d.name === name)?.icon 
                        : null;
                      const FinalIcon = Icon || fallbackIcon;

                      return (
                        <Link
                          key={`${column.title}-${name}`}
                          href={href}
                          {...linkProps}
                          className="flex items-center gap-2 py-2 text-gray-400 hover:text-purple-400 transition-colors group"
                        >
                          {FinalIcon && (
                            <FinalIcon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                          )}
                          <span className="text-[14px]">{name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-purple-500/10">
            <p className="text-[13px] text-gray-500 text-center">
              &copy; {copyrightText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
