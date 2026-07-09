import { defineField, defineType } from 'sanity';

export const gymEnquiry = defineType({
  name: 'gymEnquiry',
  title: 'Connect Enquiries',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Enquiry Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'unread',
      options: {
        list: [
          { title: 'Unread', value: 'unread' },
          { title: 'Resolved', value: 'resolved' }
        ]
      }
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
