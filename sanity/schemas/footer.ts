import { defineType } from 'sanity'

export default defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer',
  fields: [
    {
      name: 'columns',
      type: 'array',
      title: 'Footer Columns',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Column Title',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      type: 'string',
                      title: 'Link Name',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'type',
                      type: 'string',
                      title: 'Link Type',
                      description: 'Select how this link should behave when clicked',
                      options: {
                        list: [
                          { title: 'External Link', value: 'link' },
                          { title: 'Email', value: 'email' },
                          { title: 'Phone', value: 'phone' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'link',
                    },
                    {
                      name: 'icon',
                      type: 'image',
                      title: 'Icon Image',
                      description: 'Upload a custom icon image (SVG, PNG, etc.)',
                      options: {
                        hotspot: true,
                      },
                      fields: [
                        {
                          name: 'alt',
                          type: 'string',
                          title: 'Alternative Text',
                        },
                      ],
                    },
                    {
                      name: 'iconName',
                      type: 'string',
                      title: 'Icon Name (Optional)',
                      description: 'React icon component name (e.g., FaYoutube, MdEmail, MdPhone). Leave empty if using uploaded icon image.',
                    },
                    {
                      name: 'link',
                      type: 'string',
                      title: 'Link Value',
                      description: 'For Link: full URL (https://...). For Email: email address. For Phone: phone number.',
                      validation: (Rule: any) =>
                        Rule.required().custom((value: string, context: any) => {
                          if (!value) return true;
                          const linkType = context.parent?.type || 'link';
                          
                          if (linkType === 'email') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(value)) {
                              return 'Invalid email format. Enter just the email address (e.g., contact@example.com)';
                            }
                            return true;
                          }
                          
                          if (linkType === 'phone') {
                            const phoneRegex = /^[\d\s\-+()]+$/;
                            if (!phoneRegex.test(value)) {
                              return 'Invalid phone format. Enter the phone number (e.g., +1 234 567 8900)';
                            }
                            return true;
                          }
                          
                          // Link type - validate as URL
                          try {
                            new URL(value);
                            return true;
                          } catch {
                            return 'Invalid URL format. Use: https://example.com';
                          }
                        }),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'contactForm',
      type: 'object',
      title: 'Contact Form',
      description: 'Configure the contact form that appears in the footer',
      fields: [
        {
          name: 'showContactForm',
          type: 'boolean',
          title: 'Show Contact Form',
          description: 'Toggle to show/hide the contact form in the footer',
          initialValue: false,
        },
        {
          name: 'title',
          type: 'string',
          title: 'Form Title',
          description: 'e.g., "Send a Message"',
          initialValue: 'Send a Message',
        },
        {
          name: 'recipientEmail',
          type: 'string',
          title: 'Recipient Email',
          description: 'Email address where contact form submissions will be sent',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              const showForm = context.parent?.showContactForm;
              if (showForm && !value) {
                return 'Recipient email is required when contact form is enabled';
              }
              if (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                  return 'Invalid email format';
                }
              }
              return true;
            }),
        },
        {
          name: 'budgetOptions',
          type: 'array',
          title: 'Budget Options',
          description: 'Options for the budget dropdown (leave empty to hide this field)',
          of: [{ type: 'string' }],
        },
        {
          name: 'submitButtonText',
          type: 'string',
          title: 'Submit Button Text',
          initialValue: 'Send Message',
        },
        {
          name: 'responseTimeText',
          type: 'string',
          title: 'Response Time Text',
          description: 'Text shown below the submit button',
          initialValue: 'We typically respond within 24 hours.',
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'string',
      title: 'Copyright Text',
      description: 'e.g., "John Doe 2024 Inc. All rights reserved."',
    },
  ],
})
