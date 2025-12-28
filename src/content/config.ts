import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('ApartamentePeris'),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const propertiesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    currency: z.string().default('EUR'),
    status: z.enum(['disponibil', 'rezervat', 'vandut']),
    type: z.enum(['apartament', 'casa', 'teren']),
    area: z.number(),
    rooms: z.number(),
    bedrooms: z.number(),
    bathrooms: z.number(),
    floor: z.number().optional(),
    totalFloors: z.number().optional(),
    parking: z.boolean().default(false),
    garage: z.boolean().default(false),
    balcony: z.boolean().default(false),
    terrace: z.boolean().default(false),
    garden: z.boolean().default(false),
    yearBuilt: z.number().optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })),
    features: z.array(z.string()).optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string(),
      county: z.string(),
    }),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    mansarda: z.boolean().default(false),
    roomSurfaces: z.array(z.object({
      name: z.string(),
      surface: z.number(),
    })).optional(),
  }),
});

const teamCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    image: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
    socials: z.array(z.object({
      platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'whatsapp']),
      url: z.string(),
    })).optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  blog: blogCollection,
  properties: propertiesCollection,
  team: teamCollection,
};
