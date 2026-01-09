"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { urlFor } from "@/lib/sanity/image";

type SkillDataProviderProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
  imageAsset?: {
    asset?: { url?: string };
    alt?: string;
  };
};

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
  imageAsset,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;

  // Use Sanity image if available, otherwise fallback to local path
  const imageUrl = imageAsset?.asset?.url
    ? urlFor(imageAsset).width(width).height(height).url()
    : `/skills/${src}`;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
    >
      <Image 
        src={imageUrl} 
        width={width} 
        height={height} 
        alt={name}
      />
    </motion.div>
  );
};
