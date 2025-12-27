"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
  index?: number;
};

// Different gradient backgrounds for each card to match the space theme
const cardGradients = [
  "from-purple-900/40 via-blue-900/30 to-cyan-900/40",
  "from-blue-900/40 via-purple-900/30 to-pink-900/40",
  "from-cyan-900/40 via-purple-900/30 to-blue-900/40",
];

const cardBorders = [
  "border-purple-500/50",
  "border-blue-500/50",
  "border-cyan-500/50",
];

const cardShadows = [
  "shadow-purple-500/20",
  "shadow-blue-500/20",
  "shadow-cyan-500/20",
];

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  index = 0,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradientClass = cardGradients[index % cardGradients.length];
  const borderClass = cardBorders[index % cardBorders.length];
  const shadowClass = cardShadows[index % cardShadows.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="w-full"
    >
      <Link
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative overflow-hidden rounded-xl border-2 ${borderClass} bg-gradient-to-br ${gradientClass} backdrop-blur-sm ${shadowClass} shadow-2xl transition-all duration-300 group`}
        >
          {/* Animated background glow effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.3 : 0.1,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-br ${gradientClass} blur-xl -z-10`}
          />

          {/* Shimmer effect on hover */}
          <motion.div
            animate={{
              x: isHovered ? "100%" : "-100%",
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"
          />

          {/* Image container with overlay */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
              className="relative h-[250px] sm:h-[300px] md:h-[350px]"
            >
              <Image
                src={src}
                alt={title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            </motion.div>
          </div>

          {/* Content section */}
          <div className="relative p-6 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-sm">
            <motion.h1
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-semibold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              {title}
            </motion.h1>
            <motion.p
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-gray-300 text-sm leading-relaxed overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </motion.p>

            {/* Animated arrow indicator */}
            <motion.div
              animate={{ x: isHovered ? 10 : 0, opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex items-center gap-2 text-cyan-400"
            >
              <span className="text-sm font-medium">View Project</span>
              <motion.svg
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.div>
          </div>

          {/* Animated border glow */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.5,
              boxShadow: isHovered
                ? `0 0 20px ${shadowClass.split("/")[0]}/50`
                : `0 0 10px ${shadowClass.split("/")[0]}/20`,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 rounded-xl border-2 ${borderClass} pointer-events-none`}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};
