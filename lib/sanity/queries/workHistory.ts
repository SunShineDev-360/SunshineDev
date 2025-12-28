export const WORK_HISTORY_SECTION_QUERY = /* groq */ `
  *[_type == "workHistorySection"][0] {
    _id,
    title,
    workItems[]-> {
      _id,
      period,
      role,
      company,
      description,
      skills
    } | order(period desc)
  }
`

