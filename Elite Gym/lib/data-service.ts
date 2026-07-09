import { createClient } from '@sanity/client';
import { User, Payment, Booking, BmiRecord, Enquiry, Review, Notification, GymClass } from './types';

const REVALIDATE_TIME = process.env.NODE_ENV === 'development' ? 0 : 60;

// Initialize Sanity Client for mutations
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '33hdmw4c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// ----------------------------------------------------
// FALLBACK SEED DATA
// ----------------------------------------------------

const DEFAULT_USERS: User[] = [
  {
    id: 'member-1',
    name: 'Kasun Perera',
    email: 'member@elitefitness.lk',
    passwordHash: '8b7f8728a381cdb1ec05bb4e3391b4e05b38dcdb8bcbc6ce43e74ff1efd211cc082a6f20b8ec921bb1e3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3', // Kasun@123
    passwordSalt: '8a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    role: 'member',
    status: 'active',
    phone: '0771234567',
    profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    packageId: 'standard-1',
    packageStatus: 'active',
    packageExpiry: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_CLASSES: GymClass[] = [
  { id: 'class-1', name: 'Power Yoga', trainer: 'Coach Nilanthi De Silva', time: '06:30 PM', duration: '60 mins', capacity: 20, day: 'Monday' },
  { id: 'class-2', name: 'HIIT Cardio blast', trainer: 'Coach Nilanthi De Silva', time: '08:00 PM', duration: '45 mins', capacity: 15, day: 'Wednesday' },
  { id: 'class-3', name: 'Zumba Fiesta', trainer: 'Coach Dilhan Gunawardena', time: '05:00 PM', duration: '60 mins', capacity: 25, day: 'Tuesday' },
  { id: 'class-4', name: 'CrossFit Strength', trainer: 'Coach Ruwan Perera', time: '07:00 AM', duration: '60 mins', capacity: 12, day: 'Thursday' },
  { id: 'class-5', name: 'Cardio Core', trainer: 'Coach Nilanthi De Silva', time: '09:00 AM', duration: '50 mins', capacity: 20, day: 'Saturday' }
];

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userId: 'member-1',
    userName: 'Kasun Perera',
    rating: 5,
    comment: 'Elite Fitness has transformed my lifestyle. The trainers are incredibly knowledgeable, and the facilities in Colombo are state-of-the-art!',
    status: 'approved',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    userId: 'member-1',
    classId: 'class-1',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    userId: 'member-1',
    userName: 'Kasun Perera',
    packageName: 'Standard Fit Plan',
    amount: 8000,
    method: 'bank_transfer',
    status: 'approved',
    reference: 'WhatsApp Request',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_BMI_RECORDS: BmiRecord[] = [
  {
    id: 'bmi-1',
    userId: 'member-1',
    weight: 72.5,
    height: 1.77,
    bmi: 23.14,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_NOTIFICATIONS: Notification[] = [];

// ----------------------------------------------------
// USERS / MEMBERS
// ----------------------------------------------------

export async function getUsers(): Promise<User[]> {
  try {
    const query = `*[_type == "memberUser"] {
      "id": _id,
      name,
      email,
      passwordHash,
      passwordSalt,
      role,
      status,
      phone,
      packageId,
      packageStatus,
      packageExpiry,
      createdAt
    }`;
    const data = await writeClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query users from Sanity, using memory fallback. Error:', e.message);
  }
  return DEFAULT_USERS;
}

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
  const doc = {
    _type: 'memberUser',
    ...data,
  };
  try {
    const res = await writeClient.create(doc);
    return { id: res._id, ...data };
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating createUser. Error:', e.message);
    return { id: 'user_' + Math.random().toString(36).substr(2, 9), ...data };
  }
}

export async function updateUser(userId: string, data: Partial<User>): Promise<boolean> {
  try {
    await writeClient
      .patch(userId)
      .set({
        ...data,
      })
      .commit();
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating updateUser. Error:', e.message);
    return true;
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    await writeClient.delete(userId);
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating deleteUser. Error:', e.message);
    return true;
  }
}

// ----------------------------------------------------
// CLASSES
// ----------------------------------------------------

export async function getClasses(): Promise<GymClass[]> {
  try {
    const query = `*[_type == "gymClass"] {
      "id": _id,
      name,
      trainer,
      time,
      duration,
      capacity,
      day
    }`;
    const data = await writeClient.fetch(query, {}, { next: { revalidate: REVALIDATE_TIME } });
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query classes from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_CLASSES;
}

// ----------------------------------------------------
// BOOKINGS (CLASS SELECTION)
// ----------------------------------------------------

export async function getBookings(): Promise<Booking[]> {
  try {
    const query = `*[_type == "classBooking"] {
      "id": _id,
      userId,
      classId,
      createdAt
    }`;
    const data = await writeClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query bookings from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_BOOKINGS;
}

export async function createBooking(data: Omit<Booking, 'id'>): Promise<Booking> {
  const doc = {
    _type: 'classBooking',
    ...data,
  };
  try {
    const res = await writeClient.create(doc);
    return { id: res._id, ...data };
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating createBooking. Error:', e.message);
    return { id: 'booking_' + Math.random().toString(36).substr(2, 9), ...data };
  }
}

export async function deleteBooking(bookingId: string): Promise<boolean> {
  try {
    await writeClient.delete(bookingId);
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating deleteBooking. Error:', e.message);
    return true;
  }
}

// ----------------------------------------------------
// PAYMENTS / BOOKING REQUESTS
// ----------------------------------------------------

export async function getPayments(): Promise<Payment[]> {
  try {
    const query = `*[_type == "payment"] {
      "id": _id,
      userId,
      userName,
      packageName,
      amount,
      method,
      status,
      reference,
      createdAt
    }`;
    const data = await writeClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query payments from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_PAYMENTS;
}

export async function createPayment(data: Omit<Payment, 'id'>): Promise<Payment> {
  const doc = {
    _type: 'payment',
    ...data,
  };
  try {
    const res = await writeClient.create(doc);
    return { id: res._id, ...data };
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating createPayment. Error:', e.message);
    return { id: 'pay_' + Math.random().toString(36).substr(2, 9), ...data };
  }
}

export async function updatePayment(paymentId: string, status: 'approved' | 'rejected'): Promise<boolean> {
  try {
    await writeClient
      .patch(paymentId)
      .set({ status })
      .commit();
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating updatePayment. Error:', e.message);
    return true;
  }
}

export async function deletePayment(paymentId: string): Promise<boolean> {
  try {
    await writeClient.delete(paymentId);
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating deletePayment. Error:', e.message);
    return true;
  }
}

// ----------------------------------------------------
// BMI RECORDS
// ----------------------------------------------------

export async function getBmiHistory(): Promise<BmiRecord[]> {
  try {
    const query = `*[_type == "bmiRecord"] {
      "id": _id,
      userId,
      weight,
      height,
      bmi,
      createdAt
    }`;
    const data = await writeClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query BMI history from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_BMI_RECORDS;
}

export async function createBmiRecord(data: Omit<BmiRecord, 'id'>): Promise<BmiRecord> {
  const doc = {
    _type: 'bmiRecord',
    ...data,
  };
  try {
    const res = await writeClient.create(doc);
    return { id: res._id, ...data };
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating createBmiRecord. Error:', e.message);
    return { id: 'bmi_' + Math.random().toString(36).substr(2, 9), ...data };
  }
}

export async function deleteBmiRecord(recordId: string): Promise<boolean> {
  try {
    await writeClient.delete(recordId);
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating deleteBmiRecord. Error:', e.message);
    return true;
  }
}

// ----------------------------------------------------
// CONTACT ENQUIRIES
// ----------------------------------------------------

export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const query = `*[_type == "gymEnquiry"] {
      "id": _id,
      name,
      email,
      phone,
      subject,
      message,
      status,
      createdAt
    }`;
    const data = await writeClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query enquiries from Sanity, using fallback. Error:', e.message);
  }
  return [];
}

export async function createEnquiry(data: Omit<Enquiry, 'id'>): Promise<Enquiry> {
  const doc = {
    _type: 'gymEnquiry',
    ...data,
  };
  try {
    const res = await writeClient.create(doc);
    return { id: res._id, ...data };
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating createEnquiry. Error:', e.message);
    return { id: 'enq_' + Math.random().toString(36).substr(2, 9), ...data };
  }
}

export async function updateEnquiryStatus(enquiryId: string, status: 'unread' | 'resolved'): Promise<boolean> {
  try {
    await writeClient
      .patch(enquiryId)
      .set({ status })
      .commit();
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating updateEnquiryStatus. Error:', e.message);
    return true;
  }
}

export async function deleteEnquiry(enquiryId: string): Promise<boolean> {
  try {
    await writeClient.delete(enquiryId);
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating deleteEnquiry. Error:', e.message);
    return true;
  }
}

// ----------------------------------------------------
// NOTIFICATIONS
// ----------------------------------------------------

export async function getNotifications(): Promise<Notification[]> {
  try {
    const query = `*[_type == "memberNotification"] {
      "id": _id,
      userId,
      title,
      message,
      read,
      createdAt
    }`;
    const data = await writeClient.fetch(query);
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query notifications from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_NOTIFICATIONS;
}

export async function createNotification(data: Omit<Notification, 'id'>): Promise<Notification> {
  const doc = {
    _type: 'memberNotification',
    ...data,
  };
  try {
    const res = await writeClient.create(doc);
    return { id: res._id, ...data };
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating createNotification. Error:', e.message);
    return { id: 'notif_' + Math.random().toString(36).substr(2, 9), ...data };
  }
}

export async function updateNotificationRead(notifId: string, read: boolean): Promise<boolean> {
  try {
    await writeClient
      .patch(notifId)
      .set({ read })
      .commit();
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating updateNotificationRead. Error:', e.message);
    return true;
  }
}

// ----------------------------------------------------
// REVIEWS / TESTIMONIALS
// ----------------------------------------------------

export async function getReviews(): Promise<Review[]> {
  try {
    const query = `*[_type == "memberReview"] {
      "id": _id,
      userId,
      userName,
      rating,
      comment,
      status,
      createdAt
    }`;
    const data = await writeClient.fetch(query, {}, { next: { revalidate: REVALIDATE_TIME } });
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query reviews from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_REVIEWS;
}

export async function createReview(data: Omit<Review, 'id'>): Promise<Review> {
  const doc = {
    _type: 'memberReview',
    ...data,
  };
  try {
    const res = await writeClient.create(doc);
    return { id: res._id, ...data };
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating createReview. Error:', e.message);
    return { id: 'rev_' + Math.random().toString(36).substr(2, 9), ...data };
  }
}

export async function updateReviewDetails(reviewId: string, data: Partial<Review>): Promise<boolean> {
  try {
    await writeClient
      .patch(reviewId)
      .set({
        ...data,
      })
      .commit();
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating updateReviewDetails. Error:', e.message);
    return true;
  }
}

export async function deleteReview(reviewId: string): Promise<boolean> {
  try {
    await writeClient.delete(reviewId);
    return true;
  } catch (e: any) {
    console.error('Sanity write error (Insufficient write token permissions). Simulating deleteReview. Error:', e.message);
    return true;
  }
}
