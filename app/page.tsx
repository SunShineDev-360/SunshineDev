import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { WorkHistory } from "@/components/main/work-history";
import { sanityFetch } from "@/lib/sanity/fetch";
import { HOME_PAGE_QUERY } from "@/lib/sanity/queries/homePage";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries/siteSettings";
import { NAVBAR_QUERY } from "@/lib/sanity/queries/navbar";
import { HERO_QUERY } from "@/lib/sanity/queries/hero";
import { SKILLS_SECTION_QUERY } from "@/lib/sanity/queries/skills";
import { WORK_HISTORY_SECTION_QUERY } from "@/lib/sanity/queries/workHistory";
import { PROJECTS_SECTION_QUERY } from "@/lib/sanity/queries/projects";
import { FOOTER_QUERY } from "@/lib/sanity/queries/footer";

export default async function Home() {
  // Try to fetch homePage first (new consolidated structure)
  let homePageData: any = null;
  try {
    const result = await sanityFetch<any>({
      query: HOME_PAGE_QUERY,
      revalidate: 60,
    });
    // Check if result exists and has content (not just null/undefined)
    if (result && result._id) {
      homePageData = result;
    }
  } catch (error) {
    // Silently fall through to fallback structure
    // This is expected if homePage document doesn't exist yet
    console.log('HomePage data not available, trying fallback structure', error);
  }

  // If homePage exists and has data, use it; otherwise fallback to individual sections
  if (homePageData && homePageData._id) {
    return (
      <main className="h-full w-full">
        <div className="flex flex-col">
          <Hero heroData={homePageData?.hero} />
          <Skills skillsData={homePageData?.skillsSection} />
          <WorkHistory workHistoryData={homePageData?.workHistorySection} />
          <Projects projectsData={homePageData?.projectsSection} />
        </div>
      </main>
    );
  }

  // Fallback to old structure (siteSettings or individual queries)
  let siteData: any = null;
  try {
    siteData = await sanityFetch<any>({
      query: SITE_SETTINGS_QUERY,
      revalidate: 60,
    });
  } catch (error) {
    console.log('Sanity data not available, using fallbacks', error);
  }

  // Fetch individual sections as fallback if siteSettings doesn't exist
  // Wrap everything in try-catch to ensure page always renders
  let navbarData = null;
  let heroData = null;
  let skillsData = null;
  let workHistoryData = null;
  let projectsData = null;
  let footerData = null;

  try {
    [navbarData, heroData, skillsData, workHistoryData, projectsData, footerData] = await Promise.all([
      siteData?.navbar ? Promise.resolve(siteData.navbar) : sanityFetch<any>({ query: NAVBAR_QUERY, revalidate: 60 }).catch(() => null),
      siteData?.hero ? Promise.resolve(siteData.hero) : sanityFetch<any>({ query: HERO_QUERY, revalidate: 60 }).catch(() => null),
      siteData?.skillsSection ? Promise.resolve(siteData.skillsSection) : sanityFetch<any>({ query: SKILLS_SECTION_QUERY, revalidate: 60 }).catch(() => null),
      siteData?.workHistorySection ? Promise.resolve(siteData.workHistorySection) : sanityFetch<any>({ query: WORK_HISTORY_SECTION_QUERY, revalidate: 60 }).catch(() => null),
      siteData?.projectsSection ? Promise.resolve(siteData.projectsSection) : sanityFetch<any>({ query: PROJECTS_SECTION_QUERY, revalidate: 60 }).catch(() => null),
      siteData?.footer ? Promise.resolve(siteData.footer) : sanityFetch<any>({ query: FOOTER_QUERY, revalidate: 60 }).catch(() => null),
    ]);
  } catch (error) {
    console.error('Error fetching Sanity data, using fallbacks:', error);
    // Continue with null values - components will use fallback constants
  }

  // Always return the page, even if all data fetches failed
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
