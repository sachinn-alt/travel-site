export const fallbackHomeData = {
  hero: {
    title: "Journey Beyond The Ordinary",
    subtitle: "Curated luxury expeditions, private retreats, and hand-crafted cultural odysseys across 40+ countries.",
    badge: "✨ Nominated World's Best Bespoke Travel Curator 2026",
    stats: [
      { value: "40+", label: "Destinations" },
      { value: "14k+", label: "Happy Explorers" },
      { value: "4.96", label: "Guest Rating ★" },
      { value: "100%", label: "Carbon Offset" }
    ]
  },
  highlights: [
    {
      icon: "Compass",
      title: "Bespoke Itineraries",
      description: "Tailored to your rhythm, passions, and personal curiosity with private guides."
    },
    {
      icon: "ShieldCheck",
      title: "Seamless Safety & Care",
      description: "24/7 dedicated concierge, vetted 5-star properties, and emergency coverage."
    },
    {
      icon: "Sparkles",
      title: "Exclusive VIP Access",
      description: "Private after-hours palace visits, chartered yachts, and chef's table dining."
    },
    {
      icon: "Leaf",
      title: "Conscious Travel",
      description: "Every journey directly funds local habitat protection and indigenous artisans."
    }
  ],
  featuredTours: [
    {
      id: "tour-1",
      place: "Amalfi Coast & Capri Yacht Odyssey",
      region: "international",
      category: "coastal",
      country: "Italy",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      price: 249999,
      duration: "7 Days / 6 Nights",
      rating: 4.98,
      reviewsCount: 142,
      badge: "Signature Voyage",
      description: "Cruise azure Mediterranean cliffs, anchor in secluded grottos, and dine in cliffside lemon groves under candlelight.",
      highlights: ["Private Riva Boat Charter to Capri", "Michelin-starred cliffside dining in Positano", "Exclusive cellar tasting in Ravello", "Luxury boutique clifftop suite"],
      itinerary: [
        { day: 1, title: "Arrival in Naples & Private Transfer to Positano" },
        { day: 2, title: "Private Catamaran Cruise along Amalfi Coastline" },
        { day: 3, title: "Capri Island & The Blue Grotto by Private Riva" },
        { day: 4, title: "Ravello Gardens & Classical Sunset Symphony" },
        { day: 5, title: "Artisan Lemon Orchards & Culinary Masterclass" },
        { day: 6, title: "Sorrento Coastline Sunset Dinner on Board" },
        { day: 7, title: "Farewell Espresso & VIP Airport Transfer" }
      ]
    },
    {
      id: "tour-2",
      place: "Kyoto & Mount Fuji Cherry Blossom Trail",
      region: "international",
      category: "culture",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      price: 285000,
      duration: "9 Days / 8 Nights",
      rating: 4.99,
      reviewsCount: 218,
      badge: "Top Rated",
      description: "Step into timeless Zen gardens, stay in private luxury Ryokans with natural onsens, and witness Mount Fuji in twilight.",
      highlights: ["Private Tea Ceremony with a Grandmaster", "First-class Shinkansen bullet train transit", "Overnight in 300-year-old Ryokan in Hakone", "Bamboo forest dawn stroll before crowds"],
      itinerary: [
        { day: 1, title: "Arrival in Tokyo & Private Penthouse Check-in" },
        { day: 2, title: "Ancient Asakusa & Ginza Culinary Exploration" },
        { day: 3, title: "Bullet Train to Hakone & Mount Fuji Onsen Retreat" },
        { day: 4, title: "Hakone Open-Air Museum & Lake Ashi Cruise" },
        { day: 5, title: "Arrival in Kyoto & Gion Lanterns Twilight Walk" },
        { day: 6, title: "Fushimi Inari Sunrise & Arashiyama Bamboo Grove" },
        { day: 7, title: "Exclusive Zen Temple Meditation & Tea Ritual" },
        { day: 8, title: "Nara Deer Sanctuary & Kaiseki Feast" },
        { day: 9, title: "Departure from Osaka International" }
      ]
    },
    {
      id: "tour-3",
      place: "Royal Rajasthan Palace & Desert Safari",
      region: "domestic",
      category: "culture",
      country: "India",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      price: 135000,
      duration: "8 Days / 7 Nights",
      rating: 4.95,
      reviewsCount: 304,
      badge: "Royal Heritage",
      description: "Relive imperial heritage staying in real maharajah palaces, exploring golden sandstone forts, and glamping beneath starry Thar skies.",
      highlights: ["Stay at Taj Lake Palace in Udaipur", "Private sunset camel safari in Jaisalmer dunes", "Exclusive royal court dining in Jaipur", "Heritage vintage car tour"],
      itinerary: [
        { day: 1, title: "Royal Welcome in Jaipur (Pink City)" },
        { day: 2, title: "Amber Fort & City Palace Private Chambers" },
        { day: 3, title: "Transit to the Blue City of Jodhpur & Mehrangarh Fort" },
        { day: 4, title: "Golden City of Jaisalmer & Desert Dunes Glamping" },
        { day: 5, title: "Folk Music Under Thar Desert Stars" },
        { day: 6, title: "Scenic drive to Udaipur (City of Lakes)" },
        { day: 7, title: "Private Boat Ride on Lake Pichola & Taj Palace" },
        { day: 8, title: "Royal Farewell Breakfast & Airport Departure" }
      ]
    },
    {
      id: "tour-4",
      place: "Swiss Alps & Glacier Express Panorama",
      region: "international",
      category: "mountain",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      price: 310000,
      duration: "7 Days / 6 Nights",
      rating: 4.97,
      reviewsCount: 165,
      badge: "Alpine Luxury",
      description: "Glide through towering snow peaks on the world's most scenic luxury train, stay in Zermatt facing the iconic Matterhorn.",
      highlights: ["Glacier Express Excellence Class tickets", "Matterhorn Glacier Paradise cable car ride", "Private fondue tasting in alpine chalet", "Helicopter flight over Jungfrau massif"],
      itinerary: [
        { day: 1, title: "Zurich Arrival & First Class Transit to Lucerne" },
        { day: 2, title: "Lake Lucerne Cruise & Mount Pilatus Cogwheel" },
        { day: 3, title: "Boarding the Glacier Express to Zermatt" },
        { day: 4, title: "Gornergrat Panorama & Matterhorn Sunrise" },
        { day: 5, title: "Alpine Spa Day & St. Moritz Luxury Stroll" },
        { day: 6, title: "Engadin Valley Scenic Walk & Fondue Feast" },
        { day: 7, title: "Scenic Return to Zurich for Departure" }
      ]
    },
    {
      id: "tour-5",
      place: "Ladakh High Altitude Monasteries & Pangong Lake",
      region: "domestic",
      category: "mountain",
      country: "India",
      image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      price: 88000,
      duration: "6 Days / 5 Nights",
      rating: 4.93,
      reviewsCount: 198,
      badge: "High Altitude Wonder",
      description: "Traverse high mountain passes, witness dawn monk chants in cliffside gompas, and sleep in heated domes by the color-changing Pangong Lake.",
      highlights: ["Sunrise prayer at Thiksey Monastery", "Drive across Khardung La (17,982 ft)", "Luxury eco-glamping on Pangong Tso shores", "Nubra Valley Bactrian double-hump camel ride"],
      itinerary: [
        { day: 1, title: "Fly into Leh & Rest for Acclimatization" },
        { day: 2, title: "Leh Palace, Shanti Stupa & Hall of Fame" },
        { day: 3, title: "Khardung La Pass to Nubra Valley & Sand Dunes" },
        { day: 4, title: "Diskit Monastery & Scenic Drive to Pangong Lake" },
        { day: 5, title: "Color-changing Lake Sunrise & Return to Leh" },
        { day: 6, title: "Souvenir Shopping at Leh Bazaar & Departure" }
      ]
    },
    {
      id: "tour-6",
      place: "Bali & Nusa Penida Tropical Sanctum",
      region: "international",
      category: "coastal",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      price: 175000,
      duration: "7 Days / 6 Nights",
      rating: 4.96,
      reviewsCount: 247,
      badge: "Tropical Haven",
      description: "Private cliffside villa with infinity pool, sacred water temple cleansings, and private yacht expedition to Kelingking T-Rex Beach.",
      highlights: ["Private luxury jungle villa in Ubud", "Yacht day trip to Nusa Penida & Manta Bay", "Mount Batur Sunrise Jeep tour", "Traditional Balinese sound healing session"],
      itinerary: [
        { day: 1, title: "Airport VIP Arrival & Transfer to Jungle Villa Ubud" },
        { day: 2, title: "Tegalalang Rice Terraces & Sacred Water Temple" },
        { day: 3, title: "Mount Batur Sunrise Jeep & Natural Hot Springs" },
        { day: 4, title: "Transfer to Uluwatu Clifftop Ocean Resort" },
        { day: 5, title: "Private Speedboat to Nusa Penida & Snorkeling" },
        { day: 6, title: "Kecak Fire Dance at Uluwatu Temple & Seafood Dinner" },
        { day: 7, title: "Balinese Spa Pampering & Airport Departure" }
      ]
    }
  ]
};

export const fallbackCategoriesData = {
  domestic: {
    category: "Incredible India",
    subtitle: "From snowy Himalayan peaks to golden desert palaces and sun-drenched coastal backwaters.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
    subcategories: [
      { name: "Mountains & Serenity", slug: "mountain" },
      { name: "Coastal & Backwaters", slug: "coastal" },
      { name: "Royal Heritage", slug: "culture" }
    ],
    tours: [
      {
        id: "dom-1",
        place: "Kashmir Valley: Gulmarg & Dal Lake Houseboats",
        subcategory: "mountain",
        duration: "6 Days / 5 Nights",
        price: 74999,
        rating: 4.94,
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80",
        description: "Stay in heritage carved cedar houseboats on Dal Lake and ride the world's highest cable car in Gulmarg."
      },
      {
        id: "dom-2",
        place: "Kerala Backwaters & Munnar Tea Sanctuaries",
        subcategory: "coastal",
        duration: "5 Days / 4 Nights",
        price: 58000,
        rating: 4.91,
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
        description: "Drift peacefully through palm-fringed lagoons in luxury thatched houseboats and breathe emerald misty tea gardens."
      },
      {
        id: "dom-3",
        place: "Royal Rajasthan Palace & Desert Safari",
        subcategory: "culture",
        duration: "8 Days / 7 Nights",
        price: 135000,
        rating: 4.95,
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
        description: "Stay in palaces of Jaipur & Udaipur, witness desert stargazing in Jaisalmer, and experience royal Rajput hospitality."
      },
      {
        id: "dom-4",
        place: "Ladakh Monasteries & Pangong High Altitude Camp",
        subcategory: "mountain",
        duration: "6 Days / 5 Nights",
        price: 88000,
        rating: 4.93,
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
        description: "Traverse high altitude passes, hear morning chants in cliffside monasteries, and sleep by glowing blue waters."
      },
      {
        id: "dom-5",
        place: "Goa Luxury Clifftops & Heritage Latin Quarters",
        subcategory: "coastal",
        duration: "4 Days / 3 Nights",
        price: 46000,
        rating: 4.88,
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
        description: "Private beach resort sanctuary in South Goa, sunset yacht cruise, and historic Portuguese architecture walks."
      },
      {
        id: "dom-6",
        place: "Varanasi Spiritual Dawn & Ganges Aarti",
        subcategory: "culture",
        duration: "3 Days / 2 Nights",
        price: 32000,
        rating: 4.96,
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
        description: "Witness timeless spiritual rituals on the sacred ghats at dawn, private evening boat for the mesmerizing Maha Aarti."
      }
    ]
  },
  international: {
    category: "World Wonders",
    subtitle: "Handpicked global journeys spanning the Mediterranean, Alpine peaks, vibrant Asian capitals, and tropical islands.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    subcategories: [
      { name: "Coastal Paradises", slug: "coastal" },
      { name: "Alpine & Mountain Wonders", slug: "mountain" },
      { name: "Cultural Epochs", slug: "culture" }
    ],
    tours: [
      {
        id: "int-1",
        place: "Amalfi Coast & Capri Yacht Odyssey",
        subcategory: "coastal",
        duration: "7 Days / 6 Nights",
        price: 249999,
        rating: 4.98,
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
        description: "Cruise azure Mediterranean cliffs, anchor in secluded grottos, and dine in cliffside lemon groves under candlelight."
      },
      {
        id: "int-2",
        place: "Swiss Alps & Glacier Express Panorama",
        subcategory: "mountain",
        duration: "7 Days / 6 Nights",
        price: 310000,
        rating: 4.97,
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
        description: "First-class Glacier Express scenic train, Matterhorn sunrise views, and alpine wellness retreats in Zermatt."
      },
      {
        id: "int-3",
        place: "Kyoto & Mount Fuji Cherry Blossom Trail",
        subcategory: "culture",
        duration: "9 Days / 8 Nights",
        price: 285000,
        rating: 4.99,
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
        description: "Private tea ceremonies, ancient pagoda dawn walks, Michelin kaiseki dining, and peaceful hot spring onsens."
      },
      {
        id: "int-4",
        place: "Santorini Clifftop Villas & Sunset Catamaran",
        subcategory: "coastal",
        duration: "6 Days / 5 Nights",
        price: 225000,
        rating: 4.96,
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
        description: "Whitewashed caldera suites with private plunge pools, Aegean sailing, and volcanic vineyard tastings."
      },
      {
        id: "int-5",
        place: "Norwegian Fjords & Northern Lights Hunt",
        subcategory: "mountain",
        duration: "7 Days / 6 Nights",
        price: 295000,
        rating: 4.95,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        description: "Dog-sledding across snow frontiers, sleeping in glass igloos, and chasing aurora borealis ribbons."
      },
      {
        id: "int-6",
        place: "Cairo, Luxor & Nile Luxury River Cruise",
        subcategory: "culture",
        duration: "8 Days / 7 Nights",
        price: 195000,
        rating: 4.92,
        image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80",
        description: "Private Egyptologist-led tours to Giza Pyramids, King Tut's tomb in Valley of the Kings, and 5-star Nile dahabiya."
      }
    ]
  }
};

export const fallbackGalleryData = [
  {
    id: 1,
    title: "Positano Clifftop Twilight",
    location: "Amalfi Coast, Italy",
    category: "coastal",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Matterhorn Peak Mirror Reflection",
    location: "Zermatt, Switzerland",
    category: "mountain",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Kyoto Golden Temple in Spring",
    location: "Kyoto, Japan",
    category: "culture",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Santorini Oia Blue Domes",
    location: "Cyclades, Greece",
    category: "coastal",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Hawa Mahal Palace of Winds",
    location: "Jaipur, India",
    category: "culture",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "Pangong Tso Turquoise Waters",
    location: "Ladakh, India",
    category: "mountain",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    title: "Balloons Rising over Cappadocia",
    location: "Goreme, Turkey",
    category: "mountain",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    title: "Kelingking Beach T-Rex Headland",
    location: "Nusa Penida, Indonesia",
    category: "coastal",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 9,
    title: "Taj Mahal at Soft Dawn",
    location: "Agra, India",
    category: "culture",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80"
  }
];

export const fallbackAboutData = {
  heading: "The Art of Slow, Luxurious Travel",
  subheading: "Founded by explorers, designed for dreamers seeking authentic wonder.",
  description: "Odyssey was born from a singular conviction: travel should not be a checklist of crowded monuments, but a transformative immersion into the soul of places. We blend private aviation, secret access, authentic culinary heritage, and thoughtful conservation into journeys you remember for a lifetime.",
  mission: "To create unforgettable, deeply enriching travel experiences that protect local cultures, restore natural habitats, and awaken human curiosity.",
  vision: "To set the global benchmark for bespoke, regenerative luxury expeditions where every mile leaves the world more beautiful than we found it.",
  stats: [
    { number: "14+", label: "Years of Crafting Journeys" },
    { number: "40+", label: "Countries Worldwide" },
    { number: "99.4%", label: "Satisfaction & Repeat Explorers" },
    { number: "100%", label: "Zero Single-Use Plastic Pledge" }
  ],
  coreValues: [
    {
      title: "Radical Authenticity",
      desc: "No tourist traps. We partner directly with indigenous storytellers, generational artisans, and renowned historians."
    },
    {
      title: "Obsessive Craftsmanship",
      desc: "Every hotel, driver, private yacht, and hidden dining cellar is personally tested and verified by our curators."
    },
    {
      title: "24/7 Guardian Angel",
      desc: "Our concierge team travels with you silently, solving delays, booking surprise tables, and keeping you safe."
    },
    {
      title: "Regenerative Impact",
      desc: "5% of every expedition fee directly funds wildlife preserves, clean water projects, and village education."
    }
  ],
  team: [
    {
      name: "Aria Montgomery",
      role: "Founder & Head of Curation",
      location: "Geneva & Milan",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      quote: "The world opens its true heart only when you slow down and listen."
    },
    {
      name: "Devrat Sharma",
      role: "Director of South Asia Expeditions",
      location: "New Delhi & Jaipur",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      quote: "Every fort has a thousand songs, every desert dune a secret story."
    },
    {
      name: "Elena Rostova",
      role: "Head of Alpine & Nordic Journeys",
      location: "Zermatt & Oslo",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      quote: "Mountains test your breath and expand your spirit like nothing else on earth."
    }
  ]
};

export const fallbackContactData = {
  offices: [
    {
      city: "New Delhi (HQ)",
      officeName: "Odyssey South Asia Atelier",
      address: "Suite 402, The Oberoi Commercial Wing, Dr. Zakir Hussain Marg, New Delhi 110003",
      email: "delhi@odysseyexpeditions.com",
      phone: "+91 11 4982 3300",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM IST"
    },
    {
      city: "Mumbai",
      officeName: "Odyssey Coastal Concierge",
      address: "Level 14, Maker Chambers VI, Nariman Point, Mumbai 400021",
      email: "mumbai@odysseyexpeditions.com",
      phone: "+91 22 6124 9900",
      hours: "Mon - Fri: 9:30 AM - 6:30 PM IST"
    },
    {
      city: "Zurich",
      officeName: "Odyssey European Private Office",
      address: "Bahnhofstrasse 28, 8001 Zürich, Switzerland",
      email: "europe@odysseyexpeditions.com",
      phone: "+41 44 215 8800",
      hours: "Mon - Fri: 8:30 AM - 5:30 PM CET"
    },
    {
      city: "Dubai",
      officeName: "Odyssey Middle East Gateway",
      address: "DIFC Gate Village, Building 03, Dubai, UAE",
      email: "dubai@odysseyexpeditions.com",
      phone: "+971 4 362 7700",
      hours: "Sun - Thu: 9:00 AM - 6:00 PM GST"
    }
  ],
  faqs: [
    {
      q: "Can I customize the destinations and dates in any package?",
      a: "Yes! 100% of our journeys can be customized. You can extend stays, upgrade to private helicopters, swap hotels, or request special private dining."
    },
    {
      q: "What is included in the tour price?",
      a: "All luxury accommodations, daily breakfast, private chauffeur transit, private guides, all monument entry tickets, and 24/7 dedicated concierge assistance."
    },
    {
      q: "How does the flexible cancellation policy work?",
      a: "We offer 100% full refund up to 21 days prior to departure, or seamless credit transfer to any future expedition within 24 months."
    },
    {
      q: "Are flights and visas included?",
      a: "We provide complete visa documentation assistance and can book international first/business class tickets upon request with our airline partners."
    }
  ],
  feedbacks: [
    {
      name: "Vikram & Ananya Malhotra",
      date: "2026-03-01",
      rating: 5,
      location: "Mumbai",
      tour: "Swiss Alps & Glacier Express",
      message: "The most flawless holiday we have ever experienced. The private fondue in Zermatt facing the Matterhorn will remain etched in our memory forever. Odyssey’s concierge is peerless."
    },
    {
      name: "Sophia Chen",
      date: "2026-02-18",
      rating: 5,
      location: "Singapore",
      tour: "Kyoto & Mount Fuji Trail",
      message: "From the private tea ceremony in Kyoto to the sunrise over Mount Fuji from our Ryokan onsen, every minute was pure poetry. Worth every penny."
    },
    {
      name: "Rajesh Singhania",
      date: "2026-01-29",
      rating: 5,
      location: "New Delhi",
      tour: "Royal Rajasthan Palace Tour",
      message: "Staying at the Taj Lake Palace and having a private vintage car motorcade in Jaipur felt like living as royalty. Exemplary curation."
    }
  ]
};
