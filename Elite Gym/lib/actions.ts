'use server';

import { User, Payment, Booking, BmiRecord, Enquiry, Review, Notification, GymPackage, GymClass } from './types';
import { hashPassword, generateSalt, verifyPasswordStrength } from './auth-utils';
import { createSession, getSession, destroySession } from './session';
import { revalidatePath } from 'next/cache';
import { getPackages } from './sanity-service';
import {
  getUsers,
  createUser,
  updateUser,
  getClasses,
  getBookings,
  createBooking,
  deleteBooking,
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getBmiHistory,
  createBmiRecord,
  deleteBmiRecord as dbDeleteBmiRecord,
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  getNotifications,
  createNotification,
  updateNotificationRead,
  getReviews,
  createReview,
  updateReviewDetails,
  deleteReview as dbDeleteReview,
} from './data-service';

// Helper to get active user ID
async function getAuthUserId(): Promise<string> {
  const session = await getSession();
  if (!session) throw new Error('Unauthenticated');
  return session.userId;
}

// ----------------------------------------------------
// AUTHENTICATION ACTIONS
// ----------------------------------------------------

export async function registerUser(formData: any) {
  const { name, email, password, phone, packageId } = formData;

  if (!name || !email || !password || !phone) {
    return { success: false, error: 'All fields are required.' };
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone.trim())) {
    return { success: false, error: 'Please enter a valid 10-digit phone number.' };
  }

  const users = await getUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  // Verify password strength
  const passCheck = verifyPasswordStrength(password);
  if (!passCheck.isValid) {
    return { success: false, error: passCheck.error };
  }

  const salt = generateSalt();
  const hash = hashPassword(password, salt);

  // Find selected package if provided
  const allPackages = await getPackages();
  const selectedPkg = packageId ? allPackages.find(p => p.id === packageId) : null;

  const newUser = await createUser({
    name,
    email: email.toLowerCase(),
    passwordHash: hash,
    passwordSalt: salt,
    role: 'member',
    status: 'active',
    phone: phone || undefined,
    packageId: selectedPkg ? selectedPkg.id : undefined,
    packageStatus: selectedPkg ? 'pending' : 'none',
    createdAt: new Date().toISOString()
  });

  // If a package was selected, register a pending booking request
  if (selectedPkg) {
    await createPayment({
      userId: newUser.id,
      userName: newUser.name,
      packageName: selectedPkg.name,
      amount: selectedPkg.price,
      method: 'bank_transfer',
      status: 'pending',
      reference: 'WhatsApp Request',
      createdAt: new Date().toISOString()
    });
  }

  await createSession(newUser.id, newUser.name, newUser.email, newUser.role);
  return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } };
}

export async function loginUser(formData: any) {
  const { email, password } = formData;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const users = await getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  if (user.status === 'suspended') {
    return { success: false, error: 'Your account has been suspended. Please contact management.' };
  }

  const hash = hashPassword(password, user.passwordSalt);
  if (hash !== user.passwordHash) {
    return { success: false, error: 'Invalid email or password.' };
  }

  await createSession(user.id, user.name, user.email, user.role);
  return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function logoutUser() {
  await destroySession();
  return { success: true };
}

// ----------------------------------------------------
// PROFILE & ACCOUNT MANAGEMENT
// ----------------------------------------------------

export async function updateProfile(data: { name: string; email: string; phone?: string; profilePic?: string }) {
  try {
    const userId = await getAuthUserId();
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) return { success: false, error: 'User not found' };

    // Check if email is already taken by someone else
    const emailConflict = users.find(u => u.id !== userId && u.email.toLowerCase() === data.email.toLowerCase());
    if (emailConflict) {
      return { success: false, error: 'Email is already in use by another account.' };
    }

    if (data.phone) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(data.phone.trim())) {
        return { success: false, error: 'Please enter a valid 10-digit phone number.' };
      }
    }

    await updateUser(userId, {
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      profilePic: data.profilePic
    });

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function changePassword(data: any) {
  try {
    const { currentPassword, newPassword } = data;
    const userId = await getAuthUserId();
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) return { success: false, error: 'User not found' };
    const user = users[userIndex];

    const currentHash = hashPassword(currentPassword, user.passwordSalt);
    if (currentHash !== user.passwordHash) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    const passCheck = verifyPasswordStrength(newPassword);
    if (!passCheck.isValid) {
      return { success: false, error: passCheck.error };
    }

    const newSalt = generateSalt();
    const newHash = hashPassword(newPassword, newSalt);

    await updateUser(userId, {
      passwordHash: newHash,
      passwordSalt: newSalt
    });

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function simulateForgotPassword(email: string) {
  const users = await getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: 'No account found with this email.' };
  }

  // Simulate sending email
  return { success: true, message: 'Password reset instructions have been simulated! (A reset token has been logged to console).' };
}

// ----------------------------------------------------
// ENQUIRY ACTIONS
// ----------------------------------------------------

export async function submitEnquiry(formData: any) {
  try {
    const { name, email, phone, subject, message } = formData;

    if (!name || !email || !phone || !subject || !message) {
      return { success: false, error: 'All fields are required.' };
    }

    // Server-side Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Server-side Phone Validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.trim())) {
      return { success: false, error: 'Please enter a valid 10-digit phone number.' };
    }

    await createEnquiry({
      name,
      email,
      phone,
      subject,
      message,
      status: 'unread',
      createdAt: new Date().toISOString()
    });

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || 'An error occurred. Please try again.' };
  }
}

// ----------------------------------------------------
// CLASS BOOKINGS
// ----------------------------------------------------

export async function bookClass(classId: string) {
  try {
    const userId = await getAuthUserId();
    const classes = await getClasses();

    // Check class capacity
    const selectedClass = classes.find(c => c.id === classId);
    if (!selectedClass) return { success: false, error: 'Class not found' };

    const bookings = await getBookings();
    const activeBookings = bookings.filter(b => b.classId === classId);
    if (activeBookings.length >= selectedClass.capacity) {
      return { success: false, error: 'Class is already fully booked!' };
    }

    // Check if user already booked it
    const existing = bookings.find(b => b.userId === userId && b.classId === classId);
    if (existing) {
      return { success: false, error: 'You have already booked this class.' };
    }

    // Create booking
    await createBooking({
      userId,
      classId,
      createdAt: new Date().toISOString()
    });

    // Add booking notification
    await createNotification({
      userId,
      title: 'Class Booked Successfully',
      message: `You booked "${selectedClass.name}" with ${selectedClass.trainer} on ${selectedClass.day} at ${selectedClass.time}.`,
      read: false,
      createdAt: new Date().toISOString()
    });

    revalidatePath('/classes');
    revalidatePath('/member-dashboard');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function cancelBooking(bookingId: string) {
  try {
    const userId = await getAuthUserId();
    const bookings = await getBookings();

    const booking = bookings.find(b => b.id === bookingId && b.userId === userId);
    if (!booking) return { success: false, error: 'Booking not found' };

    const classes = await getClasses();
    const selectedClass = classes.find(c => c.id === booking.classId);

    await deleteBooking(bookingId);

    // Add cancellation notification
    await createNotification({
      userId,
      title: 'Class Booking Cancelled',
      message: `Your booking for "${selectedClass?.name || 'Class'}" has been cancelled.`,
      read: false,
      createdAt: new Date().toISOString()
    });

    revalidatePath('/classes');
    revalidatePath('/member-dashboard');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ----------------------------------------------------
// BMI RECORDS
// ----------------------------------------------------

export async function saveBmiRecord(data: { weight: number; height: number }) {
  try {
    const userId = await getAuthUserId();
    const { weight, height } = data;

    if (weight <= 0 || height <= 0) {
      return { success: false, error: 'Weight and height must be positive values.' };
    }

    // Compute BMI: weight (kg) / height (m) ^ 2
    const bmiVal = parseFloat((weight / (height * height)).toFixed(2));

    const newRecord = await createBmiRecord({
      userId,
      weight,
      height,
      bmi: bmiVal,
      createdAt: new Date().toISOString()
    });

    revalidatePath('/bmi-history');
    return { success: true, bmi: bmiVal, record: newRecord };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteBmiRecord(recordId: string) {
  try {
    const userId = await getAuthUserId();
    const bmiRecords = await getBmiHistory();
    const record = bmiRecords.find(r => r.id === recordId && r.userId === userId);
    
    if (!record) return { success: false, error: 'Record not found' };
    await dbDeleteBmiRecord(recordId);
    
    revalidatePath('/bmi-history');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ----------------------------------------------------
// MEMBERSHIP / BILLING SLIP UPLOADS (REPURPOSED)
// ----------------------------------------------------

export async function uploadBankSlip(data: { packageId: string; reference: string; amount: number; slipUrl: string }) {
  try {
    const userId = await getAuthUserId();
    const users = await getUsers();
    const user = users.find(u => u.id === userId);

    const allPackages = await getPackages();
    const gymPkg = allPackages.find(p => p.id === data.packageId);

    if (!user || !gymPkg) {
      return { success: false, error: 'User or package not found.' };
    }

    await createPayment({
      userId,
      userName: user.name,
      packageName: gymPkg.name,
      amount: data.amount,
      method: 'bank_transfer',
      status: 'pending',
      reference: data.reference,
      createdAt: new Date().toISOString()
    });

    // Update user's package state to pending
    await updateUser(userId, {
      packageId: gymPkg.id,
      packageStatus: 'pending'
    });

    revalidatePath('/membership');
    revalidatePath('/member-dashboard');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ----------------------------------------------------
// REVIEWS / TESTIMONIALS
// ----------------------------------------------------

export async function addReview(data: { rating: number; comment: string }) {
  try {
    const userId = await getAuthUserId();
    const users = await getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false, error: 'User not found' };

    await createReview({
      userId,
      userName: user.name,
      rating: data.rating,
      comment: data.comment,
      status: 'approved', // auto-approve instantly
      createdAt: new Date().toISOString()
    });

    revalidatePath('/reviews');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function editReview(reviewId: string, data: { rating: number; comment: string }) {
  try {
    const userId = await getAuthUserId();
    await updateReviewDetails(reviewId, {
      rating: data.rating,
      comment: data.comment,
      status: 'approved' // auto-approve instantly
    });
    
    revalidatePath('/reviews');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteReview(reviewId: string) {
  try {
    await getAuthUserId();
    await dbDeleteReview(reviewId);

    revalidatePath('/reviews');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ----------------------------------------------------
// NOTIFICATIONS
// ----------------------------------------------------

export async function markNotificationRead(notifId: string) {
  try {
    await getAuthUserId();
    await updateNotificationRead(notifId, true);
    revalidatePath('/member-dashboard');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ----------------------------------------------------
// MEMBERSHIP BOOKINGS ACTIONS
// ----------------------------------------------------

export async function bookMembership(packageId: string) {
  try {
    const userId = await getAuthUserId();
    const users = await getUsers();
    const user = users.find(u => u.id === userId);

    const allPackages = await getPackages();
    const gymPkg = allPackages.find(p => p.id === packageId);

    if (!user || !gymPkg) {
      return { success: false, error: 'User or package not found.' };
    }

    // Check if they already have a pending booking request
    // Remove previous bookings to avoid double entries
    const payments = await getPayments();
    const pendingPayments = payments.filter(p => p.userId === userId && p.status === 'pending');
    for (const p of pendingPayments) {
      await deletePayment(p.id);
    }

    await createPayment({
      userId,
      userName: user.name,
      packageName: gymPkg.name,
      amount: gymPkg.price,
      method: 'bank_transfer',
      status: 'pending',
      reference: 'WhatsApp Request',
      createdAt: new Date().toISOString()
    });

    // Update user's package state to pending
    await updateUser(userId, {
      packageId: gymPkg.id,
      packageStatus: 'pending'
    });

    revalidatePath('/membership');
    revalidatePath('/member-dashboard');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function simulateWhatsAppBookingApproval() {
  try {
    const userId = await getAuthUserId();
    const users = await getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false, error: 'User not found' };

    if (!user.packageId) return { success: false, error: 'No membership booked to approve' };

    const allPackages = await getPackages();
    const pkg = allPackages.find(p => p.id === user.packageId);
    if (!pkg) return { success: false, error: 'Package details not found' };

    // Approve the pending payment entry
    const payments = await getPayments();
    const pendingPayment = payments.find(p => p.userId === userId && p.status === 'pending');
    if (pendingPayment) {
      await updatePayment(pendingPayment.id, 'approved');
    } else {
      // If no pending payment, create an approved one
      await createPayment({
        userId,
        userName: user.name,
        packageName: pkg.name,
        amount: pkg.price,
        method: 'bank_transfer',
        status: 'approved',
        reference: 'Simulated Approval',
        createdAt: new Date().toISOString()
      });
    }

    // Set membership to active and calculate expiry
    const durationMonths = pkg.duration || 1;
    const newExpiry = new Date();
    newExpiry.setMonth(newExpiry.getMonth() + durationMonths);

    await updateUser(userId, {
      packageStatus: 'active',
      packageExpiry: newExpiry.toISOString()
    });

    // Add notification
    await createNotification({
      userId,
      title: 'Membership Activated! 🎉',
      message: `Your "${pkg.name}" membership has been successfully activated. You now have full access until ${newExpiry.toLocaleDateString()}!`,
      read: false,
      createdAt: new Date().toISOString()
    });

    revalidatePath('/membership');
    revalidatePath('/member-dashboard');
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

