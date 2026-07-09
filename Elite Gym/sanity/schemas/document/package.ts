import { defineField, defineType } from 'sanity';

export const gymPackage = defineType({
  name: 'gymPackage',
  title: 'Memberships',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (LKR)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (Months)',
      type: 'number',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'popular',
      title: 'Is Popular?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});