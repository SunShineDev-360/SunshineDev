export const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    navbar-> {
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
      },
      sourceCodeLink
    },
    hero-> {
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
    },
    skillsSection-> {
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
    },
    workHistorySection-> {
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
    },
    projectsSection-> {
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
    },
    footer-> {
      _id,
      columns[] {
        title,
        links[] {
          name,
          type,
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
      contactForm {
        showContactForm,
        title,
        recipientEmail,
        budgetOptions,
        submitButtonText,
        responseTimeText
      },
      copyrightText
    }
  }
`

