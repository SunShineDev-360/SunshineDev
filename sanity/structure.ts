import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content')
    .items([
      // Site Settings (main configuration)
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      // Main sections
      S.listItem()
        .title('Navbar')
        .child(S.documentTypeList('navbar').title('Navbar')),
      S.listItem()
        .title('Hero Section')
        .child(S.documentTypeList('hero').title('Hero Section')),
      S.listItem()
        .title('Skills Section')
        .child(S.documentTypeList('skillsSection').title('Skills Section')),
      S.listItem()
        .title('Work History Section')
        .child(S.documentTypeList('workHistorySection').title('Work History Section')),
      S.listItem()
        .title('Projects Section')
        .child(S.documentTypeList('projectsSection').title('Projects Section')),
      S.listItem()
        .title('Footer')
        .child(S.documentTypeList('footer').title('Footer')),
      S.divider(),
      // Individual items
      S.listItem()
        .title('Skills')
        .child(S.documentTypeList('skill').title('Skills')),
      S.listItem()
        .title('Work History Items')
        .child(S.documentTypeList('workHistory').title('Work History Items')),
      S.listItem()
        .title('Projects')
        .child(S.documentTypeList('project').title('Projects')),
    ])
