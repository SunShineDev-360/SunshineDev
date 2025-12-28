import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

// Map icon name strings to react-icons components
const iconMap: Record<string, React.ComponentType<any>> = {
  FaYoutube,
  FaFacebook,
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
};

export function getIcon(iconName: string | null | undefined): React.ComponentType<any> | null {
  if (!iconName) return null;
  return iconMap[iconName] || null;
}

