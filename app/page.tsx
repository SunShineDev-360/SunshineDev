import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { WorkHistory } from "@/components/main/work-history";
import { sanityFetch } from "@/lib/sanity/fetch";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries/siteSettings";
import { NAVBAR_QUERY } from "@/lib/sanity/queries/navbar";
import { HERO_QUERY } from "@/lib/sanity/queries/hero";
import { SKILLS_SECTION_QUERY } from "@/lib/sanity/queries/skills";
import { WORK_HISTORY_SECTION_QUERY } from "@/lib/sanity/queries/workHistory";
import { PROJECTS_SECTION_QUERY } from "@/lib/sanity/queries/projects";
import { FOOTER_QUERY } from "@/lib/sanity/queries/footer";

export default async function Home() {
  // Try to fetch from Sanity, fallback to null if not available
  let siteData: any = null;
  try {
    siteData = await sanityFetch<any>({
      query: SITE_SETTINGS_QUERY,
      revalidate: 60,
    });
  } catch (error) {
    console.log('Sanity data not available, using fallbacks');
  }

  // Fetch individual sections as fallback if siteSettings doesn't exist
  const [navbarData, heroData, skillsData, workHistoryData, projectsData, footerData] = await Promise.all([
    siteData?.navbar || sanityFetch<any>({ query: NAVBAR_QUERY, revalidate: 60 }).catch(() => null),
    siteData?.hero || sanityFetch<any>({ query: HERO_QUERY, revalidate: 60 }).catch(() => null),
    siteData?.skillsSection || sanityFetch<any>({ query: SKILLS_SECTION_QUERY, revalidate: 60 }).catch(() => null),
    siteData?.workHistorySection || sanityFetch<any>({ query: WORK_HISTORY_SECTION_QUERY, revalidate: 60 }).catch(() => null),
    siteData?.projectsSection || sanityFetch<any>({ query: PROJECTS_SECTION_QUERY, revalidate: 60 }).catch(() => null),
    siteData?.footer || sanityFetch<any>({ query: FOOTER_QUERY, revalidate: 60 }).catch(() => null),
  ]);

  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <Hero heroData={heroData} />
        <Skills skillsData={skillsData} />
        <WorkHistory workHistoryData={workHistoryData} />
        <Projects projectsData={projectsData} />
      </div>
    </main>
  );
}
