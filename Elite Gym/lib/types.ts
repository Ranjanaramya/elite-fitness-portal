export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  role: 'admin' | 'member';
  status: 'active' | 'suspended';
  profilePic?: string;
  phone?: string;
  packageId?: string;
  packageStatus?: 'active' | 'pending' | 'expired' | 'none';
  packageExpiry?: string; // ISO String
  createdAt: string;
}

export interface GymPackage {
  id: string;
  name: string;
  price: number; // LKR
  duration: number; // in months
  benefits: string[];
  popular?: boolean;
}

export interface GymClass {
  id: string;
  name: string;
  trainer: string;
  time: string;
  duration: string;
  capacity: number;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  packageName: string;
  amount: number;
  method: 'bank_transfer' | 'gateway';
  slipUrl?: string; // base64 or file path
  status: 'pending' | 'approved' | 'rejected';
  reference: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  classId: string;
  createdAt: string;
}

export interface BmiRecord {
  id: string;
  userId: string;
  weight: number; // kg
  height: number; // m
  bmi: number;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'resolved';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
