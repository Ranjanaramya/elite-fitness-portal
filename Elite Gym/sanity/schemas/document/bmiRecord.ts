import { defineField, defineType } from 'sanity';

export const bmiRecord = defineType({
  name: 'bmiRecord',
  title: 'BMI Log Record',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weight',
      title: 'Weight (kg)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'height',
      title: 'Height (m)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bmi',
      title: 'BMI Score',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Logged At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
