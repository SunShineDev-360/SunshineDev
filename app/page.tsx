import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { WorkHistory } from "@/components/main/work-history";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <Hero />
        <Skills />
        <WorkHistory />
        <Projects />
      </div>
    </main>
  );
}
