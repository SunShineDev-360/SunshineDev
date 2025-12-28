"use client";

import { motion } from "framer-motion";
import { WORK_HISTORY } from "@/constants";

type WorkHistoryProps = {
  workHistoryData?: {
    title?: string;
    workItems?: Array<{
      _id: string;
      period: string;
      role: string;
      company: string;
      description: string;
      skills?: string[];
    }>;
  } | null;
};

export const WorkHistory = ({ workHistoryData }: WorkHistoryProps) => {
  const sectionTitle = workHistoryData?.title || "Work History";
  const workItems = workHistoryData?.workItems || WORK_HISTORY;

  return (
    <section
      id="work-history"
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-8 md:px-20"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-[40px] sm:text-[50px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center">
          {sectionTitle}
        </h2>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-5xl">
        {/* Vertical Timeline Line - Separated with content */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 transform -translate-x-1/2 hidden md:block">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-400 via-cyan-400 to-purple-400"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ 
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
              filter: "blur(1px)"
            }}
          />
        </div>

        {/* Timeline Items */}
        <div className="relative space-y-12 md:space-y-16">
          {workItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const isLeft = isEven;

            return (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                className={`relative flex items-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col gap-6 md:gap-8`}
              >
                {/* Merged Content Card - All info in one card */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    x: isLeft ? -100 : 100,
                    scale: 0.8,
                    rotateY: isLeft ? -15 : 15
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1,
                    rotateY: 0
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: isLeft ? -5 : 5,
                    z: 50,
                    transition: { duration: 0.3 }
                  }}
                  className={`relative flex-1 md:w-[45%] perspective-1000`}
                  style={{ perspective: "1000px" }}
                >
                  {/* Card Container */}
                  <div className="relative group">
                    {/* Glow Effect Behind Card */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.4,
                      }}
                    />

                    {/* Main Card */}
                    <div className="relative p-6 md:p-8 rounded-2xl bg-transparent backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl overflow-hidden">
                      {/* Animated Background Gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-purple-600/20"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        style={{
                          backgroundSize: "200% 200%",
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Period Badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.6, 
                            delay: index * 0.2 + 0.3,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="inline-block mb-4"
                        >
                          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-sm md:text-base shadow-lg shadow-purple-500/50">
                            {item.period}
                          </span>
                        </motion.div>

                        {/* Role & Company */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                          className="mb-3"
                        >
                          <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 mb-1">
                            {item.role}
                          </h3>
                          <p className="text-lg md:text-xl font-semibold text-cyan-400">
                            {item.company}
                          </p>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                          className="mb-4"
                        >
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>

                        {/* Skills Tags */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                          className="flex flex-wrap gap-2"
                        >
                          {(item.skills || []).map((skill, skillIndex) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 0.3, 
                                delay: index * 0.2 + 0.7 + skillIndex * 0.1,
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ 
                                scale: 1.1,
                                rotate: [0, -5, 5, 0],
                                transition: { duration: 0.3 }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-400/50 text-white text-xs md:text-sm font-medium backdrop-blur-sm shadow-md hover:shadow-purple-500/50 transition-all"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Timeline Dot - On the vertical line */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2 + 0.4,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="relative z-20 flex-shrink-0 hidden md:block"
                >
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-purple-500 blur-2xl opacity-60"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  
                  {/* Main Dot */}
                  <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 border-4 border-[#030014] shadow-2xl">
                    {/* Inner Pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-400"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3 + 0.5,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Spacer for right side (empty space) */}
                <div className="hidden md:block flex-1 md:w-[45%]"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
