import { defineField, defineType } from 'sanity';

export const payment = defineType({
  name: 'payment',
  title: 'Membership Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userName',
      title: 'Member Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'packageName',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Amount (LKR)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'method',
      title: 'Payment Method',
      type: 'string',
      initialValue: 'bank_transfer',
    }),
    defineField({
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: 'Pending Activation', value: 'pending' },
          { title: 'Approved / Active', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ]
      }
    }),
    defineField({
      name: 'reference',
      title: 'Booking Reference',
      type: 'string',
      initialValue: 'WhatsApp Request',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
