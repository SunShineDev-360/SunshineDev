export const HOME_PAGE_QUERY = /* groq */ `
  *[_type == "homePage"][0] {
    _id,
    hero {
      badgeText,
      mainHeading,
      highlightedText,
      description,
      buttonText,
      avatar {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        },
        alt
      }
    },
    skillsSection {
      badgeText,
      mainHeading,
      subHeading,
      skills[] {
        _key,
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
    },
    workHistorySection {
      title,
      workItems[] {
        _key,
        period,
        role,
        company,
        description,
        skills
      } | order(period desc)
    },
    projectsSection {
      title,
      projects[] {
        _key,
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
  }
`

