export type Journey = { title: string; blurb: string; img?: string; w?: number; h?: number; href?: string }

export const journeys: Journey[] = [
  { title: 'Spirit of South India', blurb: 'Temples, traditions and tranquil backwaters.', img: '/images/south.jpg', w: 1086, h: 415, href: '/spirit-of-south-india' },
  { title: 'Desert Odyssey Rajasthan', blurb: 'Palaces, forts and timeless landscapes.', img: '/images/rajasthan.jpg', w: 510, h: 244, href: '/desert-odyssey-rajasthan' },
  { title: 'Sunsets & Saffron Kashmir', blurb: 'Mountains, gardens and unforgettable beauty.', img: '/images/kashmir.jpg', w: 512, h: 244 },
  { title: 'Majestic Realms India', blurb: 'Mumbai • Aurangabad • Varanasi • Delhi.', img: '/images/majestic.jpg', w: 1086, h: 370 },
  { title: 'Ancient Encounters India', blurb: 'History, spirituality and living traditions.', img: '/images/ancient.jpg', w: 510, h: 240 },
  { title: 'Arc of the East India Tour', blurb: 'Unique cultures and breathtaking landscapes.', img: '/images/east.jpg', w: 512, h: 240 },
  { title: 'Mother Masala Tours', blurb: 'Markets, kitchens and the flavours of India.' },
]
