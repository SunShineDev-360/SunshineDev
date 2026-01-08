export const FOOTER_QUERY = /* groq */ `
  *[_type == "footer"][0] {
    _id,
    columns[] {
      title,
      links[] {
        name,
        iconName,
        icon {
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
    },
    copyrightText
  }
`

