import {
  Users,
  Sparkles,
  Heart,
  HeartCrack,
  Dog,
  Zap,
  Gift,
  MessageCircle,
  PenTool,
  Droplet,
  Gamepad2,
  Palette,
  Sparkle,
  Star,
  Scissors,
  Eye,
  Moon,
  Sun,
  Music,
  Phone,
  Hand,
  Paintbrush,
  Utensils,
  UserCheck,
  Dumbbell,
  Flower,
  HandHeart,
  Snowflake,
} from "lucide-react";

export interface Provider {
  id: number;
  type:
    | "coach"
    | "meditation"
    | "support"
    | "selfcare"
    | "spiritual"
    | "wellness"
    | "therapy"
    | "activity";
  title: string;
  name: string;
  description: string;
  // rating: number;
  location: string;
  availability: string;
  price: string;
  // specialties: string[];
  icon: any;
  color: string;
  image: string;
  videoUrl?: string;
  imageUrl?: string; // New field for still images
  socialCredential: string;
  whyRecommended: string;
  reason:
    | "going-through-something"
    | "just-curious"
    | "spiritual-glow-up"
    | "here-for-chicken";
}

// Providers for "I'm going through something 💔"
const goingThroughSomethingProviders: Provider[] = [
  {
    id: 1,
    type: "coach",
    title: "Anonymous Support Call",
    name: "Your Anonymous Bestie",
    description:
      "No pressure. No forms. Just a call with someone who listens like a bestie but thinks like a coach.",
    location: "On the other side of your phone",
    availability: "Available today",
    price: "Free with our membership 💖",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    image: "💗",
    videoUrl: "https://player.vimeo.com/video/947608166",
    socialCredential: "I'm anonymous — you won't find me anywhere 🤫",
    whyRecommended:
      "Sometimes you just need to talk to someone who doesn’t know you — but actually *gets* you.",
    reason: "going-through-something",
  },
  {
    id: 2,
    type: "coach",
    title: "Breakup Recovery Coach",
    name: "The Coach Who Went Viral",
    description:
      "Ask her anything about breakups, relationships, or just feeling lost. Get a personalized video response",
    location: "Online",
    availability: "When you need it",
    price: "Free with our membership 💖",
    icon: HeartCrack,
    color: "from-fuchsia-600 to-rose-500",
    image: "💔",
    videoUrl:
      "https://www.tiktok.com/@relationshipboss/video/7057647971139063087",
    imageUrl: "/preview-relationship-coach.png",
    socialCredential: "200K+ followers | Seen on TikTok",
    whyRecommended:
      "Sometimes what you need most isn’t advice — it’s someone who truly *understands the ending*.",
    reason: "going-through-something",
  },
  {
    id: 3,
    type: "activity",
    title: "Taster Yoga Workshops (In person)",
    name: "Sprouts From Soil",
    description:
      "Power-packed mini workshops. 50 minutes per session, in-person. 8 choices available, choose your vibe.",
    location: "New Cross, London",
    availability: "Selected weekdays only",
    price: "Free with our membership 💖",
    icon: Dog,
    color: "from-yellow-400 to-amber-500",
    image: "🌝",
    videoUrl: "https://www.instagram.com/reel/DKeynPRC1oz/",
    imageUrl: "/preview-yoga-workshop.png", // TODO: Add yoga workshop screenshot
    socialCredential: "Yoga never goes out of style",
    whyRecommended:
      "each 50-minute session offers a powerful reset for mind and body, for energy traffic, recalibrating your nervous system, and muscle relaxation.",
    reason: "going-through-something",
  },
  {
    id: 4,
    type: "wellness",
    title: "30 Minute Thai Back Massage",
    name: "LAYANA Medispa",
    description:
      "LAYANA Medispa is a massage' centre that looks to provide an exquisite relaxing experience away from day to day stresses",
    location: "London N3 2DL",
    availability: "Everyday 10 AM - 9 PM",
    price: "Free with our membership 💖",
    icon: Sparkles,
    color: "from-lime-600 to-emerald-500",
    image: "💆🏾‍♀️",
    videoUrl:
      "https://www.tiktok.com/@layana.uk/video/7461406876878621985?is_from_webapp=1&sender_device=pc&web_id=75306580996577377501",
    imageUrl: "/preview-layana-massage.png", // TODO: Add LAYANA massage screenshot
    socialCredential: "4.7-star from 2000+ clients",
    whyRecommended:
      "Because healing often starts with touch — and this one feels like a hug from your fave auntie.",
    reason: "going-through-something",
  },
  {
    id: 5,
    type: "activity",
    title: "2-hour Graffiti Workshop",
    name: "Graffik Gallery",
    description:
      "Using non-toxic spray paints, learn from real artists, suit up, spray bold designs, and take home your own urban masterpiece.",
    location: "LONDON W10 5TE",
    availability: "Saturdays only at 1PM",
    price: "Free with our membership 💖",
    icon: Zap,
    color: "from-orange-600 to-red-500",
    image: "💥",
    videoUrl:
      "https://www.tiktok.com/@graffikgallery.1/video/7516207938701184278?is_from_webapp=1&sender_device=pc&web_id=7530658099657737750",
    imageUrl: "/preview-graffiti-workshop.png", // TODO: Add graffiti workshop screenshot
    socialCredential: "17k+ likes on TikTok",
    whyRecommended:
      " Suit up in a classic “Breaking Bad”-style boiler suit and dust mask, and unleash your inner artist.",
    reason: "going-through-something",
  },
  {
    id: 6,
    type: "coach",
    title: "WTF Am I Doing With My Life?",
    name: "Soft Life Strategy Call",
    description:
      "If your job, degree, or life path feels like chaos, book a clarity call with someone who *gets it*.",
    location: "Your phone (no camera required)",
    availability: "Available this week",
    price: "Free with our membership 💖",
    icon: HandHeart,
    color: "from-sky-500 to-indigo-600",
    image: "🧭",
    videoUrl: "https://player.vimeo.com/video/948112198",
    socialCredential: "Anonymous, but probably wiser than your manager 😅",
    whyRecommended:
      "No scripts, no hustle talk. Just soft guidance from someone who sees your potential.",
    reason: "going-through-something",
  },
  {
    id: 7,
    type: "activity",
    title: "Pottery & Vibe Class",
    name: "ArtPlay London",
    description:
      "No rules, just clay. Join this freeform pottery session to create, laugh, and maybe make a new friend.",
    location: "Liverpool Street",
    availability: "Weekday lunch or weekends",
    price: "Free with our membership 💖",
    icon: Palette,
    color: "from-brown-400 to-amber-500",
    image: "🏺",
    videoUrl: "https://www.instagram.com/p/DIvUm_rs0CY/",
    imageUrl: "/preview-pottery-class.png", // TODO: Add pottery class screenshot
    socialCredential: "IG: 58k followers @artplaylondon",
    whyRecommended:
      "Reconnect with your creative side. Because sometimes, healing is just making something with your hands.",
    reason: "going-through-something",
  },
  {
    id: 8,
    type: "activity",
    title: "Step Into a Tropical Paradise",
    name: "London Butterfly Garden",
    description:
      "Step into a breathtaking rainforest-inspired butterfly habitat and experience the wonder of hundreds of free-flying tropical butterflies.",
    location: "BEXLEY, KENT. DA5 1PQ",
    availability: "Everyday 10 AM - 5 PM",
    price: "Free with our membership 💖",
    icon: Gift,
    color: "from-purple-500 to-pink-500",
    image: "🦋",
    videoUrl:
      "https://www.tiktok.com/@samirayasmin295/video/7521842237760720150?is_from_webapp=1&sender_device=pc&web_id=7530658099657737750",
    imageUrl: "/preview-butterfly-garden.png", // TODO: Add butterfly garden screenshot
    socialCredential: "25k videos on TikTok. For a good reason.",
    whyRecommended:
      "Be grateful for life’s small wonders. Because sometimes, healing starts with a little magic.",
    reason: "going-through-something",
  },
];

// Providers for "I'm just curious 👀"
const justCuriousProviders: Provider[] = [
  {
    id: 9,
    type: "support",
    title: "Anonymous Curiosity Call",
    name: "Your Mystery Bestie",
    description:
      "Feeling curious, confused, or just want to chat anonymously with someone smart and kind? I got you.",
    location: "Anywhere you are",
    availability: "Available today",
    price: "Free with our membership 💖",
    icon: MessageCircle,
    color: "from-purple-500 to-indigo-600",
    image: "🌀",
    socialCredential: "Totally off the grid — that's the point 🤫",
    whyRecommended:
      "Because sometimes curiosity feels better when no one knows you're asking.",
    reason: "just-curious",
  },

  {
    id: 10,
    type: "wellness",
    title: "The Glow-Up Checklist",
    name: "Mini Ritual, Major Shift",
    description:
      "A 15-minute spiritual and self-care reset you can do at home. From mirror talk to tea rituals.",
    location: "At home, in your vibe zone",
    availability: "Now",
    price: "Free with our membership 💖",
    icon: Sparkles,
    color: "from-pink-400 to-yellow-300",
    image: "🌞",
    socialCredential: "Inspired by the 'that girl' and 'Jesus glow' trends",
    whyRecommended:
      "Sometimes your glow just needs a little nudge — and this is your nudge.",
    reason: "just-curious",
  },

  {
    id: 11,
    type: "wellness",
    title: "Try TikTok's Ice Rolling Trend",
    name: "Facial Reset Hack",
    description:
      "Use a face roller or a cold spoon to reset your nervous system and look awake AF.",
    location: "Home / bathroom / wherever",
    availability: "Now",
    price: "Free with our membership 💖",
    icon: Snowflake,
    color: "from-blue-400 to-cyan-500",
    image: "🧊",
    socialCredential: "Trending on #skintok",
    whyRecommended:
      "Because wellness can be fun, cheap, and weirdly effective.",
    reason: "just-curious",
  },

  {
    id: 12,
    type: "wellness",
    title: "Weekly Journaling Prompt",
    name: "The Curiosity Diary",
    description:
      "This week’s question: What would your life look like if you didn’t care what people think?",
    location: "In your notebook",
    availability: "Now",
    price: "Free with our membership 💖",
    icon: PenTool,
    color: "from-stone-400 to-stone-600",
    image: "📓",
    socialCredential: "From TikTok’s journal girlies",
    whyRecommended: "Because curiosity + reflection = subtle transformation.",
    reason: "just-curious",
  },

  // This week's PAID PICKS (Free w/ HH Membership)
  {
    id: 13,
    type: "activity",
    title: "Dinner with Strangers",
    name: "Hosted by The Nomadic Table",
    description:
      "Break bread with new faces. It's £13 to join but included in HH for members!",
    location: "Various London venues",
    availability: "Next Friday",
    price: "Free with our membership 💖",
    icon: Users,
    color: "from-orange-400 to-red-500",
    image: "🍽️",
    socialCredential: "Popular Gen Z meet-up format",
    whyRecommended:
      "For the socially curious who want connection but hate awkward networking.",
    reason: "just-curious",
  },

  {
    id: 14,
    type: "wellness",
    title: "Sauna & Wellness Studio Day",
    name: "Glowhaus London",
    description:
      "Spend a day in infrared saunas, herbal steam rooms, and tea lounges. Yes, really.",
    location: "South London",
    availability: "Weekdays only",
    price: "Free with our membership 💖",
    icon: Droplet,
    color: "from-green-400 to-lime-500",
    image: "🧖",
    socialCredential: "TikTok-approved chill zone",
    whyRecommended:
      "Curiosity is healing too — and this one feels like a luxury reset.",
    reason: "just-curious",
  },

  {
    id: 15,
    type: "activity",
    title: "Squid Game: The Experience",
    name: "London Pop-Up",
    description:
      "Try your luck at Squid Game IRL (without dying, promise). Includes games, prizes, and snacks.",
    location: "London",
    availability: "Weekend only",
    price: "Free with our membership 💖",
    icon: Gamepad2,
    color: "from-red-500 to-black",
    image: "🦑",
    socialCredential: "Viral on TikTok & Instagram",
    whyRecommended:
      "For the thrill-seekers and social lurkers who want to experience the hype themselves.",
    reason: "just-curious",
  },

  {
    id: 16,
    type: "activity",
    title: "Pottery & Vibe Class",
    name: "ArtPlay London",
    description:
      "No rules, just clay. Join this freeform pottery session to create, laugh, and maybe make a new friend.",
    location: "Liverpool Street",
    availability: "Weekday lunch or weekends",
    price: "Free with our membership 💖",
    icon: Palette,
    color: "from-brown-400 to-amber-500",
    image: "🏺",
    socialCredential: "Spotted all over IG stories",
    whyRecommended:
      "Curiosity in its most creative form. Also a great way to flirt if you bring someone 😉",
    reason: "just-curious",
  },
];

// Providers for "Main Character Reset 🧘🏾"
const mainCharacterResetProviders: Provider[] = [
  {
    id: 17,
    type: "spiritual",
    title: "Faith-Based Care",
    name: "Jesus Glow, Muslim Peace, Ancestral Wisdom",
    description:
      "Find a spiritual care guide who shares your faith or philosophy. Christian, Muslim, Indigenous, or just curious — you’re covered.",
    location: "Online & In-Person",
    availability: "Limited slots weekly",
    price: "Free with our membership 💖",
    icon: Sparkle,
    color: "from-yellow-300 to-rose-400",
    image: "🛐",
    videoUrl: "https://player.vimeo.com/video/948230001",
    socialCredential:
      "Respectfully diverse | TikTok’s ‘Jesus Glow’ certified 🌟",
    whyRecommended:
      "Your reset might begin with prayer, a reading, or reconnecting with something deeper.",
    reason: "spiritual-glow-up",
  },
  {
    id: 18,
    type: "spiritual",
    title: "Spiritual Glow-Up Kit",
    name: "Align Your Energy",
    description:
      "Breathwork, sound baths, chakra realignment — choose your glow-up ritual and let it flow.",
    location: "Online + London studios",
    availability: "Available this week",
    price: "Free with our membership 💖",
    icon: Star,
    color: "from-violet-500 to-indigo-600",
    image: "✨",
    videoUrl: "https://player.vimeo.com/video/948230045",
    socialCredential: "Seen in #SpiritualGlowUp with over 3M views",
    whyRecommended:
      "Not everything needs fixing. Some things just need realignment — with breath, music, and stillness.",
    reason: "spiritual-glow-up",
  },
  {
    id: 19,
    type: "wellness",
    title: "Crown Reset: Braids + Vibes",
    name: "Talk & Twist Session",
    description:
      "Get your hair done and your mind untangled. Quiet option available — or chat with someone who gets it.",
    location: "South & East London",
    availability: "Available next week",
    price: "Free with our membership 💖",
    icon: Scissors,
    color: "from-amber-400 to-fuchsia-600",
    image: "💇🏾‍♀️",
    videoUrl: "https://player.vimeo.com/video/948230088",
    socialCredential: "TikTok trend: ‘therapy at the salon’",
    whyRecommended:
      "Sometimes your healing starts with your hair — and the person touching your crown.",
    reason: "spiritual-glow-up",
  },
  {
    id: 20,
    type: "coach",
    title: "Mirror Coaching Session",
    name: "Talk to Your Higher Self",
    description:
      "A guided session to help you connect with the you that’s already thriving. Identity check-in + reset clarity.",
    location: "Online only",
    availability: "Slots open weekly",
    price: "Free with our membership 💖",
    icon: Eye,
    color: "from-blue-400 to-cyan-500",
    image: "🪞",
    videoUrl: "https://player.vimeo.com/video/948230144",
    socialCredential: "Featured in ‘Becoming Her’ playlists",
    whyRecommended:
      "Because the most powerful glow-up is the one that’s already inside you.",
    reason: "spiritual-glow-up",
  },
  {
    id: 21,
    type: "activity",
    title: "Sunrise Walk + Audio Reset",
    name: "Main Character Mornings",
    description:
      "Solo or group sunrise walk with our soft affirmations playlist. Your inner peace era starts at 6am.",
    location: "Greenwich Park + Local Recommendations",
    availability: "Every Saturday & self-guided anytime",
    price: "Free with our membership 💖",
    icon: Sun,
    color: "from-orange-300 to-yellow-500",
    image: "🌅",
    videoUrl: "https://player.vimeo.com/video/948230199",
    socialCredential: "IG & TikTok: #MainCharacterMorning",
    whyRecommended:
      "You’re not just waking up — you’re rising into a softer, wiser version of you.",
    reason: "spiritual-glow-up",
  },
  {
    id: 22,
    type: "spiritual",
    title: "Tarot or Birth Chart Reading",
    name: "Clarity from the Cosmos",
    description:
      "You pick: astrology, tarot, or oracle. Get your questions read by someone who takes it seriously (not scammy).",
    location: "Online",
    availability: "Slots limited (book early)",
    price: "Free with our membership 💖",
    icon: Moon,
    color: "from-indigo-700 to-purple-500",
    image: "🔮",
    videoUrl: "https://player.vimeo.com/video/948230266",
    socialCredential: "Verified spiritual readers on Holding Health",
    whyRecommended:
      "Whether or not you believe in fate — sometimes guidance just hits different when it’s cosmic.",
    reason: "spiritual-glow-up",
  },
  {
    id: 23,
    type: "coach",
    title: "Confidence & Worth Coach",
    name: "Soft Power Sessions",
    description:
      "Not a hype coach. Not a pick-me. Just someone to help you find your voice, your power, your glow.",
    location: "Online",
    availability: "Available this week",
    price: "Free with our membership 💖",
    icon: Sparkles,
    color: "from-rose-500 to-yellow-400",
    image: "💁🏽‍♀️",
    videoUrl: "https://player.vimeo.com/video/948230313",
    socialCredential: "Black woman coach featured on IG Lives & panels",
    whyRecommended: "You already have it — they just help you *see it louder*.",
    reason: "spiritual-glow-up",
  },
  {
    id: 24,
    type: "selfcare",
    title: "Makeover for the Soul",
    name: "Therapy Meets Glam",
    description:
      "What if self-care was a combo of therapy, nails, hair, and confidence coaching? That’s this.",
    location: "London & Online",
    availability: "Available monthly (limited bundle)",
    price: "Free with our membership 💖",
    icon: Heart,
    color: "from-pink-500 to-fuchsia-600",
    image: "💅",
    videoUrl: "https://player.vimeo.com/video/948230362",
    socialCredential: "Coming soon on Holding Health 💖",
    whyRecommended:
      "You’re not vain — you’re claiming yourself. And that deserves celebration.",
    reason: "spiritual-glow-up",
  },
];

// Providers for "I'm only here for the chicken 😭" (fun/food-related wellness)
const hereForChickenProviders: Provider[] = [
  {
    id: 25,
    type: "wellness",
    title: "Sound Bath on Demand",
    name: "Soothing Soundscapes",
    description:
      "Listen to a healing audio sound bath curated to support nervous system rest and body repair.",
    location: "Online audio",
    availability: "Listen anytime",
    price: "Free with our membership 💖",
    icon: Music,
    color: "from-violet-500 to-purple-600",
    image: "🔊",
    socialCredential:
      "Created by a certified music therapist + Black wellness creator",
    whyRecommended:
      "Nervous system healing can start with 10 mins of calm. Music is a science-backed healing tool.",
    reason: "here-for-chicken",
  },
  {
    id: 26,
    type: "therapy",
    title: "1:1 Calm Call",
    name: "Certified Chill Friend™",
    description:
      "Book a short call with someone trained in stress support and real-life empathy. Think hotline, but softer.",
    location: "Phone call",
    availability: "Evenings + weekends",
    price: "Free with our membership 💖",
    icon: Phone,
    color: "from-teal-500 to-cyan-500",
    image: "🌊",
    socialCredential: "Trauma-informed peer listener",
    whyRecommended:
      "Stress isn't just mental — it’s physical. Talking to someone who *gets it* can regulate your whole system.",
    reason: "here-for-chicken",
  },
  {
    id: 27,
    type: "selfcare",
    title: "Chronic Care Massage",
    name: "Compassionate Touch Therapist",
    description:
      "30-min massage with a therapist trained in chronic conditions. Yes, they *actually* get it.",
    location: "London-based studio",
    availability: "Book this week",
    price: "Free with our membership 💖",
    icon: Hand,
    color: "from-amber-300 to-rose-400",
    image: "💆🏾",
    socialCredential:
      "Certified massage therapist with chronic pain experience",
    whyRecommended:
      "Physical touch can release pain, improve sleep, and calm the nervous system. Especially powerful with chronic flare-ups.",
    reason: "here-for-chicken",
  },
  {
    id: 28,
    type: "activity",
    title: "Sip & Sculpt Art Therapy",
    name: "Clay, Chat & Chill Host",
    description:
      "Pottery and conversation to boost mood and reduce stress. Clay is good for the soul.",
    location: "Liverpool Street, London",
    availability: "Wednesdays + Fridays",
    price: "Free with our membership 💖",
    icon: Paintbrush,
    color: "from-rose-400 to-amber-500",
    image: "🫙",
    socialCredential: "HH hosted creative therapy experience",
    whyRecommended:
      "Art can lower cortisol and bring joy — plus you’ll walk away with something you made!",
    reason: "here-for-chicken",
  },
  {
    id: 29,
    type: "coach",
    title: "Nutrition Check-In",
    name: "Holistic Nutritionist",
    description:
      "A free 30-min discovery call with a qualified nutritional therapist. You’ll feel heard *and* helped.",
    location: "Phone or video call",
    availability: "Book anytime",
    price: "Free with our membership 💖",
    icon: Utensils,
    color: "from-lime-500 to-emerald-600",
    image: "🥄",
    socialCredential: "Registered nutritional therapist, POC-owned clinic",
    whyRecommended:
      "Great nutrition advice starts with a real convo. This one’s judgement-free and personalised.",
    reason: "here-for-chicken",
  },
  {
    id: 30,
    type: "therapy",
    title: "Therapy Taster Call",
    name: "Qualified HH Therapist",
    description:
      "Book a free intro call with a certified therapist (yep — for real). Talk about your needs and see if it’s a match.",
    location: "Phone or video call",
    availability: "Evenings + weekends",
    price: "Free with our membership 💖",
    icon: UserCheck,
    color: "from-purple-500 to-indigo-600",
    image: "🧠",
    socialCredential:
      "HCPC-registered therapist, just launched private practice",
    whyRecommended:
      "Finding a good therapist is hard. This free session helps you explore the vibe without pressure.",
    reason: "here-for-chicken",
  },
  {
    id: 31,
    type: "coach",
    title: "Movement Meet & Greet",
    name: "Friendly PT",
    description:
      "A free 30-min chat with a PT who gets chronic pain. Talk goals, flares, and feel-good movement.",
    location: "Phone or video call",
    availability: "Weekdays only",
    price: "Free with our membership 💖",
    icon: Dumbbell,
    color: "from-orange-500 to-yellow-500",
    image: "🧍🏾‍♂️",
    socialCredential: "Certified PT with inclusive and adaptive training",
    whyRecommended:
      "Sometimes you just need to talk it out before you commit. This call helps you feel safe and seen.",
    reason: "here-for-chicken",
  },
  {
    id: 32,
    type: "spiritual",
    title: "Spiritual Self Check-In",
    name: "HH-Aligned Wellness Guide",
    description:
      "Explore what spirituality means to you — no religion required. Just space to reflect, reconnect, and breathe.",
    location: "Phone call or voice note exchange",
    availability: "Flexible schedule",
    price: "Free with our membership 💖",
    icon: Flower,
    color: "from-blue-400 to-violet-500",
    image: "🌌",
    socialCredential:
      "Spiritual guide + energy practitioner with cultural humility",
    whyRecommended:
      "Spiritual health is often overlooked, but for many it's core to resilience and self-care. This session helps you realign.",
    reason: "here-for-chicken",
  },
];

// Export providers by reason
export const providersByReason = {
  "going-through-something": goingThroughSomethingProviders,
  "just-curious": justCuriousProviders,
  "spiritual-glow-up": mainCharacterResetProviders,
  "here-for-chicken": hereForChickenProviders,
};

// Export all providers combined
export const allProviders = [
  ...goingThroughSomethingProviders,
  ...justCuriousProviders,
  ...mainCharacterResetProviders,
  ...hereForChickenProviders,
];
