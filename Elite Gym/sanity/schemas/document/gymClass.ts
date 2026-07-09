import { defineField, defineType } from 'sanity';

export const gymClass = defineType({
  name: 'gymClass',
  title: 'Gym Class',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Class Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'trainer',
      title: 'Trainer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Class Time',
      type: 'string',
      placeholder: 'e.g. 06:30 PM',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g. 60 mins',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Max Capacity',
      type: 'number',
      initialValue: 20,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'day',
      title: 'Class Day',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'Monday' },
          { title: 'Tuesday', value: 'Tuesday' },
          { title: 'Wednesday', value: 'Wednesday' },
          { title: 'Thursday', value: 'Thursday' },
          { title: 'Friday', value: 'Friday' },
          { title: 'Saturday', value: 'Saturday' },
          { title: 'Sunday', value: 'Sunday' }
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
