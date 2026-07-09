import { defineField, defineType } from 'sanity';

export const memberNotification = defineType({
  name: 'memberNotification',
  title: 'Member Inbox Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Notification Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Notification Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'read',
      title: 'Is Read?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Sent At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
