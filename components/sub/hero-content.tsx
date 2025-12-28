"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { urlFor } from "@/lib/sanity/image";

type HeroContentProps = {
  heroData?: {
    badgeText?: string;
    mainHeading?: string;
    highlightedText?: string;
    description?: string;
    buttonText?: string;
    avatar?: {
      asset?: { url?: string };
      alt?: string;
    };
  } | null;
};

export const HeroContent = ({ heroData }: HeroContentProps) => {
  // Use Sanity data if available, fallback to defaults
  const badgeText = heroData?.badgeText || "Fullstack Developer Portfolio";
  const mainHeading = heroData?.mainHeading || "Providing the best project experience.";
  const highlightedText = heroData?.highlightedText || "the best";
  // Split mainHeading to insert highlighted text
  const headingParts = heroData?.mainHeading 
    ? heroData.mainHeading.split(heroData.highlightedText || "")
    : ["Providing ", " project experience."];
  const description = heroData?.description || "I'm a Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.";
  const buttonText = heroData?.buttonText || "Learn more";
  const avatarUrl = heroData?.avatar?.asset?.url 
    ? urlFor(heroData.avatar).width(650).height(650).url() 
    : "/avatar.png";
  const avatarAlt = heroData?.avatar?.alt || "work icons";
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-20 mt-20 sm:mt-32 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center md:justify-start m-auto text-center md:text-start md:ml-8">

        {/* Content Section - Shifted to the right */}
        <div className="h-full w-full flex flex-col gap-4 md:gap-5 justify-center text-center md:text-start md:ml-4">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              {badgeText}
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
          >
            <span>
              {headingParts[0]}
              {highlightedText && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                  {highlightedText}
                </span>
              )}
              {headingParts[1] || ""}
            </span>
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-base sm:text-lg text-gray-400 my-3 md:my-5 max-w-[600px] px-4 md:px-0"
          >
            {description}
          </motion.p>

          <motion.a
            variants={slideInFromLeft(1)}
            className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] mx-auto md:mx-0"
          >
            {buttonText}
          </motion.a>
        </div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center rounded-full mt-8 md:mt-0 md:ml-8 lg:ml-12"
      >
        <Image
          src={avatarUrl}
          alt={avatarAlt}
          height={650}
          width={650}
          draggable={false}
          className="select-none w-[300px] h-[300px] rounded-full sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px]"
        />
      </motion.div>
    </motion.div>
  );
};
