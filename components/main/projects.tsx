import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";
import { urlFor } from "@/lib/sanity/image";

type ProjectsProps = {
  projectsData?: {
    title?: string;
    projects?: Array<{
      _id: string;
      title: string;
      description: string;
      image?: {
        asset?: { url?: string };
        alt?: string;
      };
      link: string;
    }>;
  } | null;
};

export const Projects = ({ projectsData }: ProjectsProps) => {
  const sectionTitle = projectsData?.title || "My Projects";
  const projects = projectsData?.projects || PROJECTS;

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        {sectionTitle}
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-4 sm:px-6 md:px-10">
        {projects.map((project, index) => {
          // Handle both Sanity image object and string paths
          let imageUrl = '';
          if (project.image && typeof project.image === 'object' && project.image.asset?.url) {
            imageUrl = urlFor(project.image).width(1000).height(1000).url();
          } else if (typeof project.image === 'string') {
            imageUrl = project.image;
          } else {
            // Fallback for PROJECTS constant format
            imageUrl = (project as any).image || '';
          }
          
          return (
            <ProjectCard
              key={(project as any)._id || (project as any)._key || project.title}
              src={imageUrl}
              title={project.title}
              description={project.description}
              link={project.link}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};
