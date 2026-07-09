import { defineField, defineType } from 'sanity';

export const classBooking = defineType({
  name: 'classBooking',
  title: 'Class Slot Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'classId',
      title: 'Class ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Booked At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
