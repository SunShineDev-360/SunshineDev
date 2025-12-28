export const PROJECTS_SECTION_QUERY = /* groq */ `
  *[_type == "projectsSection"][0] {
    _id,
    title,
    projects[]-> {
      _id,
      title,
      description,
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
      link
    }
  }
`

