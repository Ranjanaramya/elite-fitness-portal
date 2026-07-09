import { type SchemaTypeDefinition } from 'sanity';
import { trainer } from './document/trainer';
import { gymPackage } from './document/package';
import { blog } from './document/blog';
import { amenity } from './document/amenity';
import { settings } from './document/settings';
import { memberUser } from './document/user';
import { gymClass } from './document/gymClass';
import { payment } from './document/payment';
import { classBooking } from './document/booking';
import { bmiRecord } from './document/bmiRecord';
import { gymEnquiry } from './document/enquiry';
import { memberNotification } from './document/notification';
import { memberReview } from './document/review';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    trainer, 
    gymPackage, 
    blog, 
    amenity, 
    settings,
    memberUser,
    gymClass,
    payment,
    classBooking,
    bmiRecord,
    gymEnquiry,
    memberNotification,
    memberReview
  ],
};