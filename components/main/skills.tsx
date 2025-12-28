import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  SKILL_DATA,
} from "@/constants";

type SkillsProps = {
  skillsData?: {
    badgeText?: string;
    mainHeading?: string;
    subHeading?: string;
    skills?: Array<{
      _id: string;
      name: string;
      image?: {
        asset?: { url?: string };
        alt?: string;
      };
      width: number;
      height: number;
      category: string;
    }>;
  } | null;
};

export const Skills = ({ skillsData }: SkillsProps) => {
  // Group skills by category if from Sanity, otherwise use constants
  const skills = skillsData?.skills || [];
  const generalSkills = skills.filter(s => s.category === 'general');
  const frontendSkills = skills.filter(s => s.category === 'frontend');
  const backendSkills = skills.filter(s => s.category === 'backend');
  const fullstackSkills = skills.filter(s => s.category === 'fullstack');
  const otherSkills = skills.filter(s => s.category === 'other');

  // Fallback to constants if no Sanity data
  const useConstants = !skillsData || skills.length === 0;

  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText 
        badgeText={skillsData?.badgeText}
        mainHeading={skillsData?.mainHeading}
        subHeading={skillsData?.subHeading}
      />

      {useConstants ? (
        <>
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {SKILL_DATA.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={skill.width}
                height={skill.height}
                index={i}
              />
            ))}
          </div>

          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {FRONTEND_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={skill.width}
                height={skill.height}
                index={i}
              />
            ))}
          </div>
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {BACKEND_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={skill.width}
                height={skill.height}
                index={i}
              />
            ))}
          </div>
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {FULLSTACK_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={skill.width}
                height={skill.height}
                index={i}
              />
            ))}
          </div>
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {OTHER_SKILL.map((skill, i) => (
              <SkillDataProvider
                key={skill.skill_name}
                src={skill.image}
                name={skill.skill_name}
                width={skill.width}
                height={skill.height}
                index={i}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {generalSkills.length > 0 && (
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
              {generalSkills.map((skill, i) => (
                <SkillDataProvider
                  key={skill._id}
                  src={skill.image?.asset?.url ? '' : ''}
                  name={skill.name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  imageAsset={skill.image}
                />
              ))}
            </div>
          )}
          {frontendSkills.length > 0 && (
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
              {frontendSkills.map((skill, i) => (
                <SkillDataProvider
                  key={skill._id}
                  src=""
                  name={skill.name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  imageAsset={skill.image}
                />
              ))}
            </div>
          )}
          {backendSkills.length > 0 && (
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
              {backendSkills.map((skill, i) => (
                <SkillDataProvider
                  key={skill._id}
                  src=""
                  name={skill.name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  imageAsset={skill.image}
                />
              ))}
            </div>
          )}
          {fullstackSkills.length > 0 && (
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
              {fullstackSkills.map((skill, i) => (
                <SkillDataProvider
                  key={skill._id}
                  src=""
                  name={skill.name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  imageAsset={skill.image}
                />
              ))}
            </div>
          )}
          {otherSkills.length > 0 && (
            <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
              {otherSkills.map((skill, i) => (
                <SkillDataProvider
                  key={skill._id}
                  src=""
                  name={skill.name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  imageAsset={skill.image}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
