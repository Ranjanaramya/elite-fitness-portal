import { client } from '@/sanity/lib/client';
import { getClasses as getClassesFromData } from './data-service';

const REVALIDATE_TIME = process.env.NODE_ENV === 'development' ? 0 : 60;

// Fallback images from Unsplash (used only when image asset upload is blank in Sanity Studio)
export const MOCK_IMAGES = {
  trainer1: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=400&auto=format&fit=crop',
  trainer2: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=400&auto=format&fit=crop',
  trainer3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  blog1: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
  blog2: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
  blog3: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
  amenityCardio: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format&fit=crop',
  amenityWeights: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop',
  amenityYoga: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500&auto=format&fit=crop',
  amenityLocker: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=500&auto=format&fit=crop',
  amenityPool: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=500&auto=format&fit=crop',
};

export interface TrainerContent {
  name: string;
  position: string;
  experience: number;
  specialization: string;
  imageUrl: string;
}

export interface BlogContent {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  imageUrl: string;
}

export interface AmenityContent {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  details: string[];
}

export interface GymSettings {
  address: string;
  phone: string;
  email: string;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

// ----------------------------------------------------
// FALLBACK SEED DATA
// ----------------------------------------------------

const DEFAULT_PACKAGES = [
  { id: 'basic-1', name: 'Basic Gym Plan', price: 5000, duration: 1, benefits: ['Access to main gym floor', 'Locker & changing rooms', '1 Fitness assessment', 'Free Wi-Fi'], popular: false },
  { id: 'standard-1', name: 'Standard Fit Plan', price: 8000, duration: 1, benefits: ['Access to main gym floor', 'Locker & changing rooms', 'Unlimited group classes', 'Access to Cardio & Weight zones', 'Steam room access'], popular: true },
  { id: 'premium-1', name: 'Elite Premium Plan', price: 45000, duration: 6, benefits: ['Access to all zones & amenities', 'Unlimited group classes', '2 Personal Trainer sessions per month', 'Sauna, steam room & spa pool', 'Complimentary towel service', '10% discount on supplements'], popular: false },
  { id: 'family-1', name: 'Family Pack (2+ Members)', price: 75000, duration: 6, benefits: ['Full access for up to 3 family members', 'Locker & shower facilities', 'Group classes included', 'Monthly health consultations', 'Guest passes (5 per month)'], popular: false }
];

const DEFAULT_TRAINERS: TrainerContent[] = [
  {
    name: 'Coach Ruwan Perera',
    position: 'Lead Strength & Conditioning Coach',
    experience: 8,
    specialization: 'Bodybuilding, Powerlifting & Muscle Hypertrophy',
    imageUrl: MOCK_IMAGES.trainer1
  },
  {
    name: 'Coach Nilanthi De Silva',
    position: 'Yoga & HIIT Specialist',
    experience: 6,
    specialization: 'Flexibility, Core Stability & Cardio Endurance',
    imageUrl: MOCK_IMAGES.trainer2
  },
  {
    name: 'Coach Dilhan Gunawardena',
    position: 'Zumba & Dance Fitness Coordinator',
    experience: 5,
    specialization: 'Dance Cardio, Fat Loss & High-Energy Aerobics',
    imageUrl: MOCK_IMAGES.trainer3
  }
];

const DEFAULT_AMENITIES: AmenityContent[] = [
  {
    id: 'cardio',
    name: 'Cardio Training Zone',
    description: 'Equipped with the latest Matrix and LifeFitness treadmills, ellipticals, and stationary bikes.',
    imageUrl: MOCK_IMAGES.amenityCardio,
    details: ['30+ cardio machines', 'Integrated Netflix & Spotify consoles', 'Heart-rate monitoring zones', 'Dedicated HIIT area']
  },
  {
    id: 'weights',
    name: 'Strength & Free Weights Area',
    description: 'Dumbbells up to 50kg, multiple power racks, lifting platforms, and pin-selected strength machines.',
    imageUrl: MOCK_IMAGES.amenityWeights,
    details: ['Olympia platforms', 'Eleiko barbel equipment', 'Dumbbells from 2.5kg to 50kg', 'Dedicated weightlifting coaches']
  },
  {
    id: 'yoga',
    name: 'Group Fitness Studio',
    description: 'A spacious, climate-controlled studio for Yoga, Pilates, Zumba, and high-intensity interval training.',
    imageUrl: MOCK_IMAGES.amenityYoga,
    details: ['Hardwood flooring', 'Surround sound audio', 'Equipment provided (mats, bands)', 'Up to 30 members per class']
  }
];

const DEFAULT_BLOGS: BlogContent[] = [
  {
    id: 'blog-1',
    title: '5 Benefits of Regular Strength Training',
    category: 'Workout Guides',
    date: new Date().toISOString(),
    excerpt: 'Strength training is essential for heart health, bone density, and metabolic efficiency. Here are the top 5 reasons you should start lifting.',
    content: 'Full content...',
    readTime: '4 min read',
    imageUrl: MOCK_IMAGES.blog1
  },
  {
    id: 'blog-2',
    title: 'The Perfect Post-Workout Nutrition Guide',
    category: 'Nutrition Tips',
    date: new Date().toISOString(),
    excerpt: 'What you eat after a workout determines how well your body recovers and builds muscle. Discover the optimal protein-to-carb ratios.',
    content: 'Full content...',
    readTime: '6 min read',
    imageUrl: MOCK_IMAGES.blog2
  }
];

// ====================================================
// DATA FETCHING & SYNCHRONIZATION METHODS
// ====================================================

// 1. Fetch gym settings from Sanity exclusively
export async function getGymSettings(): Promise<GymSettings> {
  try {
    const query = `*[_type == "settings"][0]`;
    const data = await client.fetch(query, {}, { next: { revalidate: REVALIDATE_TIME } });
    if (data) {
      return {
        address: data.address || '123 Fitness Avenue, Colombo 03, Sri Lanka',
        phone: data.phone || '+94 11 234 5678',
        email: data.email || 'hello@elitefitness.lk',
        openingHours: {
          weekdays: data.openingHoursWeekdays || '5:00 AM - 10:00 PM',
          weekends: data.openingHoursWeekends || '6:00 AM - 8:00 PM',
        },
        socialLinks: {
          facebook: data.facebookUrl || 'https://facebook.com',
          instagram: data.instagramUrl || 'https://instagram.com',
          youtube: data.twitterUrl || 'https://youtube.com',
        },
      };
    }
  } catch (e: any) {
    console.warn('Failed to query settings from Sanity, using fallback. Error:', e.message);
  }

  return {
    address: '123 Fitness Avenue, Colombo 03, Sri Lanka',
    phone: '+94 11 234 5678',
    email: 'hello@elitefitness.lk',
    openingHours: {
      weekdays: '5:00 AM - 10:00 PM',
      weekends: '6:00 AM - 8:00 PM',
    },
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
    },
  };
}

// 2. Fetch trainers from Sanity exclusively
export async function getTrainers(): Promise<TrainerContent[]> {
  try {
    const query = `*[_type == "trainer"] {
      name,
      position,
      experience,
      specialization,
      "imageUrl": image.asset->url
    }`;
    const data = await client.fetch(query, {}, { next: { revalidate: REVALIDATE_TIME } });
    if (data && data.length > 0) {
      return data.map((t: any, i: number) => {
        if (!t.imageUrl) {
          const fallbacks = [MOCK_IMAGES.trainer1, MOCK_IMAGES.trainer2, MOCK_IMAGES.trainer3];
          t.imageUrl = fallbacks[i % 3];
        }
        return t;
      });
    }
  } catch (e: any) {
    console.warn('Failed to query trainers from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_TRAINERS;
}

// 3. Fetch packages from Sanity exclusively
export async function getPackages(): Promise<any[]> {
  try {
    const query = `*[_type == "gymPackage"] {
      "id": _id,
      name,
      price,
      duration,
      benefits,
      popular
    }`;
    const data = await client.fetch(query, {}, { next: { revalidate: REVALIDATE_TIME } });
    if (data && data.length > 0) {
      return data.sort((a: any, b: any) => a.price - b.price);
    }
  } catch (e: any) {
    console.warn('Failed to query packages from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_PACKAGES;
}

// 4. Fetch classes from Sanity exclusively
export async function getClasses() {
  return await getClassesFromData();
}

// 5. Fetch blogs from Sanity exclusively
export async function getBlogs(): Promise<BlogContent[]> {
  try {
    const query = `*[_type == "blog"] {
      "id": _id,
      title,
      category,
      "date": publishedAt,
      excerpt,
      content,
      readTime,
      "imageUrl": image.asset->url
    }`;
    const data = await client.fetch(query, {}, { next: { revalidate: REVALIDATE_TIME } });
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query blogs from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_BLOGS;
}

// 6. Fetch amenities from Sanity exclusively
export async function getAmenities(): Promise<AmenityContent[]> {
  try {
    const query = `*[_type == "amenity"] {
      "id": _id,
      name,
      description,
      "imageUrl": image.asset->url,
      details
    }`;
    const data = await client.fetch(query, {}, { next: { revalidate: REVALIDATE_TIME } });
    if (data && data.length > 0) return data;
  } catch (e: any) {
    console.warn('Failed to query amenities from Sanity, using fallback. Error:', e.message);
  }
  return DEFAULT_AMENITIES;
}
