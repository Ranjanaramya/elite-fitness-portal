import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elite-gym-srilanka.netlify.app';

  const staticRoutes = [
    '',
    '/our-story',
    '/facilities',
    '/memberships',
    '/coaches',
    '/insights',
    '/connect',
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
