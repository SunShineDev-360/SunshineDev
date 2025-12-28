export const FOOTER_QUERY = /* groq */ `
  *[_type == "footer"][0] {
    _id,
    columns[] {
      title,
      links[] {
        name,
        iconName,
        link
      }
    },
    copyrightText
  }
`

