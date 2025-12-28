export const SKILLS_SECTION_QUERY = /* groq */ `
  *[_type == "skillsSection"][0] {
    _id,
    badgeText,
    mainHeading,
    subHeading,
    skills[]-> {
      _id,
      name,
      image {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        },
        alt
      },
      width,
      height,
      category
    }
  }
`

