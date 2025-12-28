export const HERO_QUERY = /* groq */ `
  *[_type == "hero"][0] {
    _id,
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
  }
`

