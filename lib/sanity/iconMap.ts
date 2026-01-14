import { FaYoutube, FaFacebook, FaPhone } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { MdEmail, MdOutlineEmail, MdPhone, MdLocalPhone } from "react-icons/md";

// Map icon name strings to react-icons components
const iconMap: Record<string, React.ComponentType<any>> = {
  FaYoutube,
  FaFacebook,
  FaPhone,
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
  MdEmail,
  MdOutlineEmail,
  MdPhone,
  MdLocalPhone,
};

export function getIcon(iconName: string | null | undefined): React.ComponentType<any> | null {
  if (!iconName) return null;
  return iconMap[iconName] || null;
}

