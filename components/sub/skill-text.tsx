"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

type SkillTextProps = {
  badgeText?: string;
  mainHeading?: string;
  subHeading?: string;
};

export const SkillText = ({ badgeText, mainHeading, subHeading }: SkillTextProps) => {
  const displayBadgeText = badgeText || "Think better with Next.js 14";
  const displayMainHeading = mainHeading || "Making apps with modern technologies.";
  const displaySubHeading = subHeading || "Never miss a task, deadline or idea.";

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          {displayBadgeText}
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        {displayMainHeading}
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        {displaySubHeading}
      </motion.div>
    </div>
  );
};
