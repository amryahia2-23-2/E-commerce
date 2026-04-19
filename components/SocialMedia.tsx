// "use client";

import { SocialIcon } from "react-social-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// ✅ Data only (NO JSX here)
const socialMediaLinks = [
  { title: "Youtube", url: "https://www.youtube.com/" },
  { title: "Github", url: "https://www.github.com/" },
  { title: "Linkedin", url: "https://www.linkedin.com/" },
  { title: "Facebook", url: "https://www.facebook.com/" },
];

type Props = {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
  bgColor?: string;
  fgColor?: string; // default color if item doesn't have one
};

export default function SocialMedia({
  className,
  iconClassName,
  tooltipClassName,
  bgColor = "black",
  fgColor = "white",
}: Props) {
  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex items-center gap-4",
          className
        )}
      >
        {socialMediaLinks.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <span>
                <SocialIcon
                  url={item.url}
                  style={{
                    height: 40,
                    width: 40,
                    border: `2px solid ${fgColor}`,
                    borderRadius: "50%",
                  }}
                  bgColor={bgColor}
                  // ✅ per-icon color OR fallback to prop
                  fgColor={fgColor}
                  className={cn(
                    "hover:scale-110 hoverEffect",
                    iconClassName
                  )}
                />
              </span>
            </TooltipTrigger>

            <TooltipContent
              className={cn("bg-white text-black", tooltipClassName)}
            >
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}