export const NAVBAR_QUERY = /* groq */ `
  *[_type == "navbar"][0] {
    _id,
    name,
    logo {
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
    navLinks[] {
      title,
      link
    },
    socialLinks[] {
      name,
      iconName,
      link
    },
    sourceCodeLink
  }
`

