import { defineField, defineType } from 'sanity';

export const memberReview = defineType({
  name: 'memberReview',
  title: 'Member Testimonial Review',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userName',
      title: 'Member Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating Stars (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Testimonial Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Approval Status',
      type: 'string',
      initialValue: 'approved',
      options: {
        list: [
          { title: 'Pending Approval', value: 'pending' },
          { title: 'Approved / Public', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
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
