import { defineField, defineType } from 'sanity';

export const blog = defineType({
  name: 'blog',
  title: 'Insights',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Workout Guides', value: 'Workout Guides' },
          { title: 'Nutrition Tips', value: 'Nutrition Tips' },
          { title: 'Fitness Articles', value: 'Fitness Articles' },
          { title: 'Gym News', value: 'Gym News' },
          { title: 'Upcoming Events', value: 'Upcoming Events' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (e.g. 5 min read)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Blog Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
