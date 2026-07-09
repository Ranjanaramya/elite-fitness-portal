import { defineField, defineType } from 'sanity';

export const trainer = defineType({
  name: 'trainer',
  title: 'Coaches',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
    }),
    defineField({
      name: 'experience',
      title: 'Experience (Years)',
      type: 'number',
    }),
    defineField({
      name: 'specialization',
      title: 'Specialization',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});