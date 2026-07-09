import { defineField, defineType } from 'sanity';

export const amenity = defineType({
  name: 'amenity',
  title: 'Facilities',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Amenity Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Amenity Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'details',
      title: 'Bullet Details / Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
