"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-20 mt-20 sm:mt-32 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center md:justify-start m-auto text-center md:text-start md:ml-8">
        {/* Avatar Section */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          className="flex-shrink-0 relative"
        >
          <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px]">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/80 shadow-lg shadow-blue-500/50"></div>
            <div className="absolute inset-[4px] rounded-full overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Profile Avatar"
                width={240}
                height={240}
                className="w-full h-full object-cover rounded-full"
                draggable={false}
              />
            </div>
          </div>
        </motion.div>

        {/* Content Section - Shifted to the right */}
        <div className="h-full w-full flex flex-col gap-4 md:gap-5 justify-center text-center md:text-start md:ml-4">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              Fullstack Developer Portfolio
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
          >
            <span>
              Providing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                the best
              </span>{" "}
              project experience.
            </span>
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-base sm:text-lg text-gray-400 my-3 md:my-5 max-w-[600px] px-4 md:px-0"
          >
            I&apos;m a Full Stack Software Engineer with experience in Website,
            Mobile, and Software development. Check out my projects and skills.
          </motion.p>

          <motion.a
            variants={slideInFromLeft(1)}
            className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] mx-auto md:mx-0"
          >
            Learn more
          </motion.a>
        </div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-8 md:mt-0 md:ml-8 lg:ml-12"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px]"
        />
      </motion.div>
    </motion.div>
  );
};
