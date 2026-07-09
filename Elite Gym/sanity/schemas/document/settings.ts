import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Gym System Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'gymName',
      title: 'Gym Name',
      type: 'string',
      initialValue: 'Elite Fitness Sri Lanka',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      initialValue: '123 Fitness Avenue, Colombo 03, Sri Lanka',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+94 11 234 5678',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'hello@elitefitness.lk',
    }),
    defineField({
      name: 'openingHoursWeekdays',
      title: 'Opening Hours (Weekdays)',
      type: 'string',
      initialValue: 'Mon-Fri: 5:00 AM - 10:00 PM',
    }),
    defineField({
      name: 'openingHoursWeekends',
      title: 'Opening Hours (Weekends)',
      type: 'string',
      initialValue: 'Sat-Sun: 6:00 AM - 8:00 PM',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Link',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Link',
      type: 'string',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter Link',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Gym Logo',
      type: 'image',
    }),
  ],
});
