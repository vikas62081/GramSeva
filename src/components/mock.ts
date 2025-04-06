import {Event_} from './events/types';

export const mockHeads = [
  {id: '1', name: 'Shambhu Vishwakarma', relationship: 'Head', memberCount: 4},
  {id: '2', name: 'Jane Smith', relationship: 'Manager', memberCount: 5},
  {id: '3', name: 'Sara Connor', relationship: 'Assistant', memberCount: 4},
];

export const mockFamily = {
  id: '1',
  name: 'Shambhu Vishwakarma',
  relationship: 'Head',
  gender: 'male',
  members: [
    {
      id: '2',
      name: 'Lila',
      relationship: 'Wife',
      parentId: '1',
      gender: 'female',
    },
    {
      id: '3',
      name: 'Vikas',
      relationship: 'Son',
      parentId: '1',
      gender: 'male',
    },
    {
      id: '4',
      name: 'Vishal',
      relationship: 'Son',
      parentId: '1',
      gender: 'male',
    },
    {
      id: '5',
      name: 'Rani',
      relationship: 'Daughter',
      parentId: '1',
      gender: 'female',
    },
  ],
};

export const sampleEvents: Event_[] = [
  {
    id: '1',
    title: 'Annual Temple Festival',
    description:
      'Annual celebration with cultural programs and community feast',
    date: new Date('2024-04-15').toISOString(),
    time: '9:00 AM - 9:00 PM',
    venue: 'Village Temple Ground',
    eventHead: 'Ram Kumar',
    profilePicture:
      'https://dims.apnews.com/dims4/default/c90f053/2147483647/strip/true/crop/4500x3001+0+0/resize/2046x1364!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F8f%2F90%2F7895d6e91470dba7c6ccb2d5a4da%2F5a9cb53123a84899a0f3b7a9dc9cc2a5',
    contributors: [
      {
        id: '1',
        name: 'Rajesh Kumar',
        amount: 5000,
        date: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Priya Sharma',
        amount: 3000,
        date: new Date().toISOString(),
      },
    ],
    expenses: [
      {
        id: '1',
        name: 'Food Materials',
        amount: 8000,
        receipt: 'receipt1.jpg',
        date: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Decoration',
        amount: 5000,
        receipt: 'receipt2.jpg',
        date: new Date().toISOString(),
      },
    ],
  },
  {
    id: '2',
    title: 'Youth Sports Day',
    description: 'Annual sports competition for village youth',
    date: new Date('2024-04-20').toISOString(),
    time: '8:00 AM - 5:00 PM',
    venue: 'Village Sports Ground',
    eventHead: 'Amit Singh',
    profilePicture:
      'https://duendebymadamzozo.com/dbmzz-content/uploads/2024/03/Holi-Indian-Festival-of-Colours.jpg',
    contributors: [
      {
        id: '3',
        name: 'Sunil Verma',
        amount: 2000,
        date: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Meera Patel',
        amount: 1500,
        date: new Date().toISOString(),
      },
    ],
    expenses: [
      {
        id: '3',
        name: 'Sports Equipment',
        amount: 3000,
        receipt: 'receipt3.jpg',
        date: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Refreshments',
        amount: 2000,
        receipt: 'receipt4.jpg',
        date: new Date().toISOString(),
      },
    ],
  },
];
