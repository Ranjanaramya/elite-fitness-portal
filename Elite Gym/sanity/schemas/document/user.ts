import { defineField, defineType } from 'sanity';

export const memberUser = defineType({
  name: 'memberUser',
  title: 'Gym Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'passwordSalt',
      title: 'Password Salt',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      initialValue: 'member',
      options: {
        list: [
          { title: 'Member', value: 'member' },
          { title: 'Admin', value: 'admin' }
        ]
      }
    }),
    defineField({
      name: 'status',
      title: 'Account Status',
      type: 'string',
      initialValue: 'active',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Suspended', value: 'suspended' }
        ]
      }
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'packageId',
      title: 'Selected Package ID',
      type: 'string',
    }),
    defineField({
      name: 'packageStatus',
      title: 'Membership Status',
      type: 'string',
      initialValue: 'none',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Pending Activation', value: 'pending' },
          { title: 'Active Member', value: 'active' },
          { title: 'Expired', value: 'expired' }
        ]
      }
    }),
    defineField({
      name: 'packageExpiry',
      title: 'Membership Expiry Date',
      type: 'datetime',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
