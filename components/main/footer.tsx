import Link from "next/link";
import Image from "next/image";

import { FOOTER_DATA } from "@/constants";
import { getIcon } from "@/lib/sanity/iconMap";
import { urlFor } from "@/lib/sanity/image";

type FooterProps = {
  footerData?: {
    columns?: Array<{
      title: string;
      links?: Array<{
        name: string;
        iconName?: string;
        icon?: {
          asset?: { url?: string };
          alt?: string;
        };
        link: string;
      }>;
    }>;
    copyrightText?: string;
  } | null;
};

type FooterColumn = {
  title: string;
  links?: Array<{
    name: string;
    iconName?: string | null;
    icon?: {
      asset?: { url?: string };
      alt?: string;
    };
    link: string;
  }>;
};

export const Footer = ({ footerData }: FooterProps) => {
  const columns: FooterColumn[] = footerData?.columns || FOOTER_DATA.map((col): FooterColumn => ({
    title: col.title,
    links: col.data.map(item => ({
      name: item.name,
      iconName: item.icon?.name || null,
      icon: undefined,
      link: item.link,
    })),
  }));
  const copyrightText = footerData?.copyrightText || `John Doe ${new Date().getFullYear()} Inc. All rights reserved.`;

  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          {columns.map((column) => (
            <div
              key={column.title}
              className="min-w-[200px] h-auto flex flex-col items-center justify-start"
            >
              <h3 className="font-bold text-[16px]">{column.title}</h3>
              {column.links?.map((linkItem) => {
                const { iconName, icon, name, link } = linkItem;
                // Prioritize uploaded icon image if available
                if (icon && icon.asset?.url) {
                  const iconUrl = urlFor(icon).width(20).height(20).url();
                  return (
                    <Link
                      key={`${column.title}-${name}`}
                      href={link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex flex-row items-center my-[15px]"
                    >
                      <Image
                        src={iconUrl}
                        alt={icon.alt || name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-[15px] ml-[6px]">{name}</span>
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
                    href={link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex flex-row items-center my-[15px]"
                  >
                    {FinalIcon && <FinalIcon />}
                    <span className="text-[15px] ml-[6px]">{name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mb-[20px] text-[15px] text-center">
          &copy; {copyrightText}
        </div>
      </div>
    </div>
  );
};
