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
    imageUrl: "/preview-anonymous-support.png",
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
      "Power-packed mini workshops. 50 minutes per session, in-person. 3 choices available, choose your vibe.",
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
    type: "activity",
    title: "One-Hour Boat Rental For Two",
    name: "Richmond Rowing Boat Hire",
    description:
      "Two adventure seekers can enjoy a self-drive boat ride; includes a 15-minute instruction session and safety equipme",
    location: "south London - Richmond",
    availability: "everyday depending on weather. Booking required",
    price: "Free with our membership 💖",
    icon: MessageCircle,
    color: "from-purple-500 to-indigo-600",
    image: "🌀",
    socialCredential: "Totally off the grid — that's the point 🤫", // change
    videoUrl: "https://player.vimeo.com/video/947608166", // change
    imageUrl: "/preview-anonymous-support.png", // change
    whyRecommended:
      " Whether you're seeking a solo escape, a romantic outing, or a fun group experience, you'll surely enjoy the tranquility of the river.ss",
    reason: "just-curious",
  },

  {
    id: 10,
    type: "wellness",
    title: "Hydrating or Spa Facial + Massage",
    name: "HAUTIQUE SKIN AESTHETIC",
    description:
      "Refresh your skin and restore your glow with a luxurious 60-minute facial experience that includes a soothing massage.",
    location: "London WC2H 9AJ",
    availability: "Monday to Saturday, 12.30PM - 8PM",
    price: "Free with our membership 💖",
    icon: Sparkles,
    color: "from-pink-400 to-yellow-300",
    image: "🌞",
    socialCredential: "Jump on that trend. Be 'that girl' (or boy).",
    videoUrl: "https://www.instagram.com/p/DMZ5ghSsxYf/",
    imageUrl: "/preview-anonymous-support.png",
    whyRecommended:
      "Sometimes your glow just needs a little nudge — and this is your nudge.",
    reason: "just-curious",
  },

  {
    id: 11,
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
    id: 12,
    type: "wellness",
    title: "Crêpes & Shakes",
    name: "Crêpeaffaire",
    description:
      "Choose from a menu full of freshly made crêpes, sweet, savoury & breakfast, gluten free & vegan range",
    location: "Nationwide - London Islington",
    availability: "Anytime",
    price: "Free with our membership 💖",
    icon: PenTool,
    color: "from-stone-400 to-stone-600",
    image: "📓",
    videoUrl:
      "https://www.tiktok.com/@layana.uk/video/7461406876878621985?is_from_webapp=1&sender_device=pc&web_id=75306580996577377501",
    imageUrl: "/preview-layana-massage.png", // TODO: Add CREPES  screenshot
    socialCredential: "Favourite on Instagram - 14.5k followers",
    whyRecommended:
      "Food is the universal language for connection and care. Also you can never go wrong with crêpes.",
    reason: "just-curious",
  },
  {
    id: 13,
    type: "activity",
    title: "Dinner with Strangers",
    name: "Timeleft",
    description:
      "Break bread with new faces. We cover the joining fee, you just bring your appetite and curiosity.",
    location: "Various London venues",
    availability: "Every Wednesday",
    price: "Free with our membership 💖",
    icon: Users,
    color: "from-orange-400 to-red-500",
    image: "🍽️",
    socialCredential: "1.1M followers on Instagram. Clearly a vibe.",
    videoUrl:
      "https://www.tiktok.com/@layana.uk/video/7461406876878621985?is_from_webapp=1&sender_device=pc&web_id=75306580996577377501",
    imageUrl: "/preview-layana-massage.png",
    whyRecommended:
      "For the socially curious who want connection but hate awkward networking.",
    reason: "just-curious",
  },

  {
    id: 14,
    type: "wellness",
    title: "30 Minutes: Sports Massage",
    name: "MotionWorks Therapy",
    description:
      " Experience expert sports therapy, focusing on muscle tension relief and performance improvement",
    location: "Soho or Liverpool Street - London",
    availability: "Everyday, by appointment",
    price: "Free with our membership 💖",
    icon: Droplet,
    color: "from-green-400 to-lime-500",
    image: "🧖",
    socialCredential: "TikTok-approved chill zone",
    videoUrl:
      "https://www.tiktok.com/@layana.uk/video/7461406876878621985?is_from_webapp=1&sender_device=pc&web_id=75306580996577377501",
    imageUrl: "/preview-layana-massage.png",
    whyRecommended:
      "Curiosity is healing too — and this one feels like a luxury reset.",
    reason: "just-curious",
  },

  {
    id: 15,
    type: "activity",
    title: "Friday Jazz Night with Any Main Course and a Glass of Wine",
    name: "Atrium Bar & Restaurant",
    description:
      "Enjoy Friday Jazz Night with live bands and choose any main course paired with a glass of wine in an Art Deco ambiance",
    location: "London WC1B 5BA - Imperial London Hotel",
    availability: "7pm onwards every day. Live music starts at 9pm",
    price: "Free with our membership 💖",
    icon: Gamepad2,
    color: "from-red-500 to-black",
    image: "🦑",
    socialCredential: "Viral on TikTok & Instagram", // TODO: Add Atrium Bar social credential
    videoUrl:
      "https://www.tiktok.com/@layana.uk/video/7461406876878621985?is_from_webapp=1&sender_device=pc&web_id=75306580996577377501", // TODO: Add Atrium Bar video URL
    imageUrl: "/preview-layana-massage.png", // TODO: Add Atrium Bar screenshot
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
    videoUrl: "https://www.instagram.com/p/DIvUm_rs0CY/",
    imageUrl: "/preview-pottery-class.png", // TODO: Add pottery class screenshot
    socialCredential: "IG: 58k followers @artplaylondon",
    whyRecommended:
      "Reconnect with your creative side. Because sometimes, healing is just making something with your hands.",
    reason: "going-through-something",
  },
];

// Providers for "Main Character Reset 🧘🏾"
const mainCharacterResetProviders: Provider[] = [
  {
    id: 17,
    type: "wellness",
    title: "Express Gel Manicure",
    name: "Beauté and Browź Clinic",
    description:
      "Whether you're after a quick refresh or an indulgent hand treatment, these manicure options are ideal for prepping for special occasions or simply maintaining polished hands.",
    location: " London, Paddington W2 2HR",
    availability: "Everyday 11 AM - 8 PM. Sundays 12 PM - 6 PM",
    price: "Free with our membership 💖",
    icon: Sparkle,
    color: "from-yellow-300 to-rose-400",
    image: "🛐",
    videoUrl: "https://player.vimeo.com/video/948230001",
    imageUrl: "/preview-anonymous-support.png",
    socialCredential: "5.0 stars from 30+ happy clients on Treatwell 🌟",
    whyRecommended: "Your reset might start by getting your nails done first.",
    reason: "spiritual-glow-up",
  },
  {
    id: 18,
    type: "activity",
    title: "Friday Jazz Night with Any Main Course and a Glass of Wine",
    name: "Atrium Bar & Restaurant",
    description:
      "Enjoy Friday Jazz Night with live bands and choose any main course paired with a glass of wine in an Art Deco ambiance",
    location: "London WC1B 5BA - Imperial London Hotel",
    availability: "7pm onwards every day. Live music starts at 9pm",
    price: "Free with our membership 💖",
    icon: Gamepad2,
    color: "from-red-500 to-black",
    image: "🦑",
    socialCredential: "Viral on TikTok & Instagram", // TODO: Add Atrium Bar social credential
    videoUrl:
      "https://www.tiktok.com/@layana.uk/video/7461406876878621985?is_from_webapp=1&sender_device=pc&web_id=75306580996577377501", // TODO: Add Atrium Bar video URL
    imageUrl: "/preview-layana-massage.png", // TODO: Add Atrium Bar screenshot
    whyRecommended: "Good food, good music, good vibes.",
    reason: "spiritual-glow-up",
  },
  {
    id: 19,
    type: "activity",
    title: "One-Hour Boat Rental For Two",
    name: "Richmond Rowing Boat Hire",
    description:
      "Two adventure seekers can enjoy a self-drive boat ride; includes a 15-minute instruction session and safety equipme",
    location: "south London - Richmond",
    availability: "everyday depending on weather. Booking required",
    price: "Free with our membership 💖",
    icon: MessageCircle,
    color: "from-purple-500 to-indigo-600",
    image: "🌀",
    socialCredential: "Totally off the grid — that's the point 🤫", // change
    videoUrl: "https://player.vimeo.com/video/947608166", // change
    imageUrl: "/preview-anonymous-support.png", // change
    whyRecommended:
      "Whether you're seeking a solo escape, a romantic outing, or a fun group experience, you'll surely enjoy the tranquility of the river.",
    reason: "spiritual-glow-up",
  },
  {
    id: 20,
    type: "wellness",
    title: "Hydrating or Spa Facial + Massage",
    name: "HAUTIQUE SKIN AESTHETIC",
    description:
      "Refresh your skin and restore your glow with a luxurious 60-minute facial experience that includes a soothing massage.",
    location: "London WC2H 9AJ",
    availability: "Monday to Saturday, 12.30PM - 8PM",
    price: "Free with our membership 💖",
    icon: Sparkles,
    color: "from-pink-400 to-yellow-300",
    image: "🌞",
    socialCredential: "Jump on that trend. Be 'that girl' (or boy).",
    videoUrl: "https://www.instagram.com/p/DMZ5ghSsxYf/",
    imageUrl: "/preview-anonymous-support.png",
    whyRecommended:
      "Sometimes your glow just needs a little nudge — and this is your nudge.",
    reason: "spiritual-glow-up",
  },
  {
    id: 21,
    type: "activity",
    title: "Adventure & Relaxation: Climbing and Sauna Day Pass Combo",
    name: "BlocFit",
    description:
      "Dive into a full day of climbing topped off with a revitalizing sauna and ice bath experience!",
    location: "London Brixton SW9 8RR",
    availability: "Everyday 6am-10pm, weekends 10am-6pm",
    price: "Free with our membership 💖",
    icon: Sun,
    color: "from-orange-300 to-yellow-500",
    image: "🌅",
    videoUrl: "https://player.vimeo.com/video/948230199",
    socialCredential: "IG & TikTok: #MainCharacterMorning",
    whyRecommended:
      "The deal includes limitless access to BlocFit's impressive climbing facilities paired with an hour-long indulgence in their serene sauna and refreshing ice baths. Whether seeking thrill or tranquility post-climb, this offer covers it all.",
    reason: "spiritual-glow-up",
  },
  {
    id: 22,
    type: "activity",
    title: "5 Reformer Pilates Classes",
    name: "Pilates HQ",
    description:
      "High-energy classes designed for all levels. They help build strength and flexibility while offering a break from the busy city life.",
    location: "London Islington N1 9TP",
    availability: "Weekends only",
    price: "Free with our membership 💖",
    icon: Hand,
    color: "from-amber-300 to-rose-400",
    image: "💆🏾",
    videoUrl: "https://player.vimeo.com/video/948230362", //change
    imageUrl: "/preview-pilates-classes.png", //change
    socialCredential:
      "Ever wanted to try out the pilates princess routine? Now’s your chance.",
    whyRecommended:
      "Pilates is gentle on the body but tough on stress. It’s like a reset button for your muscles and mind.",
    reason: "spiritual-glow-up",
  },
  {
    id: 23,
    type: "coach",
    title: "Confidence & Worth Coach",
    name: "Soft Power Sessions",
    description:
      "Not a hype coach. Not a pick-me. Just someone to help you find your voice, your power, your glow.",
    location: "Your phone (no camera required)",
    availability: "Available this week",
    price: "Free with our membership 💖",
    icon: HandHeart,
    color: "from-sky-500 to-indigo-600",
    image: "🧭",
    // videoUrl: "https://player.vimeo.com/video/948112198",
    imageUrl: "/preview-anonymous-support.png",
    socialCredential: "Anonymous and judgement free",
    whyRecommended: "You already have it — they just help you *see it louder*.",
    reason: "spiritual-glow-up",
  },
  {
    id: 24,
    type: "activity",
    title: "Five Course Taster Menu with Cocktails",
    name: "Inamo Covent Garden & Inamo Soho",
    description:
      "Engage in a one-of-a-kind dining experience packed with interactive games and award-winning Asian fusion cuisine",
    location: "London, Inamo Covent Garden & Inamo Soho",
    availability: "Mon- Weds all day at all times, Thurs & Fri 12-5pm",
    price: "Free with our membership 💖",
    icon: Heart,
    color: "from-pink-500 to-fuchsia-600",
    image: "💅",
    videoUrl: "https://player.vimeo.com/video/948230362", // change
    imageUrl: "/preview-inamo-dining.png", //change
    socialCredential: "4.3 stars from 5,000+ diners",
    whyRecommended:
      "Get on a culinary journey on your way to levelling up your taste buds.",
    reason: "spiritual-glow-up",
  },
];

// UPDATE THIS TO CHRONIC CONDITION FOCUSED
const hereForChickenProviders: Provider[] = [
  {
    id: 25,
    type: "selfcare",
    title: "Discover Food Sensitivities with Precision",
    name: "Check My Body Health",
    description:
      "This test evaluates your reactivity to 600 common food and non-food items, helping to identify the sources of your sensitivity symptoms.",
    location: "At home test kit",
    availability: "Anytime",
    price: "Free with our membership 💖",
    icon: Music,
    color: "from-violet-500 to-purple-600",
    image: "🔊",
    videoUrl: "https://player.vimeo.com/video/948230362", //change
    imageUrl: "/preview-food-sensitivity-test.png",
    socialCredential:
      "Created by a certified music therapist + Black wellness creator",
    whyRecommended:
      "Our bodies are unique and we react to different foods and substances differently. This test helps you understand yours better — so you can feel your best.",
    reason: "here-for-chicken",
  },
  {
    id: 26,
    type: "therapy",
    title: "Intro Therapy Session",
    name: "Isabella Carey - Counsellor",
    description:
      "Book an intro 20 minutes call with someone trained in stress support and real-life empathy. Think hotline, but softer.",
    location: "Online or offline",
    availability: "Weekdays",
    price: "Free with our membership 💖",
    icon: Phone,
    color: "from-teal-500 to-cyan-500",
    image: "🌊",
    socialCredential: "Trauma-informed peer listener",
    whyRecommended:
      "This session is centered around curiosity and self-discovery, and it explores how the social, political, and cultural contexts influence lived experiences.",
    reason: "here-for-chicken",
  },
  {
    id: 27,
    type: "activity",
    title: "5 Reformer Pilates Classes",
    name: "Pilates HQ",
    description:
      "High-energy classes designed for all levels. They help build strength and flexibility while offering a break from the busy city life.",
    location: "London Islington N1 9TP",
    availability: "Weekends only",
    price: "Free with our membership 💖",
    icon: Hand,
    color: "from-amber-300 to-rose-400",
    image: "💆🏾",
    videoUrl: "https://player.vimeo.com/video/948230362", //change
    imageUrl: "/preview-pilates-classes.png", //change
    socialCredential:
      "Ever wanted to try out the pilates princess routine? Now’s your chance.",
    whyRecommended:
      "Pilates is gentle on the body but tough on stress. It’s like a reset button for your muscles and mind.",
    reason: "here-for-chicken",
  },
  {
    id: 28,
    type: "activity",
    title: "Dive Into Modern Art at Moco Museum London",
    name: "Moco Museum London",
    description:
      "A unique collection of over 100 modern, contemporary, digital and immersive works of art from the likes of Banksy, Kusama, and more.",
    location: "London, Marble Arch W2 2UH",
    availability: "Everyday 10 AM - 6 PM (7 PM Fri/Sat)",
    price: "Free with our membership 💖",
    icon: Paintbrush,
    color: "from-rose-400 to-amber-500",
    image: "🫙",
    socialCredential: "6M+ visitors globally | 4.6 stars by 120K visitors",
    videoUrl: "https://player.vimeo.com/video/948230362", //change
    imageUrl: "/preview-art-therapy.png", //change
    whyRecommended:
      "Art can lower cortisol and bring joy — plus you’ll walk away with something you made!",
    reason: "here-for-chicken",
  },
  {
    id: 29,
    type: "coach",
    title: "Health & Wellness Coaching Intro Call",
    name: "Willow Woolf - integrative Health",
    description:
      "A free 30-min discovery call with a qualified nutritional therapist. Whether you're struggling with emotional eating, chronic symptoms, or simply seeking support to feel more balanced.",
    location: "Phone or video call",
    availability: "Weekdays",
    price: "Free with our membership 💖",
    icon: Utensils,
    color: "from-lime-500 to-emerald-600",
    image: "🥄",
    socialCredential: "Registered health coach, women-owned clinic",
    videoUrl: "https://player.vimeo.com/video/948230362", //change
    imageUrl: "/preview-health-coaching.png", //change
    whyRecommended:
      "Great nutrition advice starts with a real convo. This one’s judgement-free and personalised.",
    reason: "here-for-chicken",
  },
  {
    id: 30,
    type: "wellness",
    title: "Two Osteopathy Treatments & Consultation",
    name: "London Health Hub",
    description:
      "If you're experiencing pain, stiffness or postural imbalances, expert osteopathy in Central London can help restore natural movement and long-term comfort.",
    location: "London Bridge SE1 1YP",
    availability: "Everyday by appointment",
    price: "Free with our membership 💖",
    icon: UserCheck,
    color: "from-purple-500 to-indigo-600",
    image: "🧠",
    socialCredential: "4.3 star rating from 300+ clients",
    videoUrl: "https://player.vimeo.com/video/948230362", //change
    imageUrl: "/preview-therapy-taster.png", //change
    whyRecommended:
      "The gym isn’t the only place to find relief. This session helps you address the root causes deep into your body's structure and function.",
    reason: "here-for-chicken",
  },
  {
    id: 31,
    type: "coach",
    title: "30 Minute Intro Call with a PT",
    name: "Adam Milner - Personal Trainer",
    description:
      "A free 30-min chat with a PT who gets chronic pain. Talk goals, flares, and feel-good movement.",
    location: "Phone call",
    availability: "Weekdays only",
    price: "Free with our membership 💖",
    icon: Dumbbell,
    color: "from-orange-500 to-yellow-500",
    image: "🧍🏾‍♂️",
    socialCredential: "Certified PT with inclusive and adaptive training",
    videoUrl: "https://player.vimeo.com/video/948230362", //change
    imageUrl: "/preview-pt-call.png", //change
    whyRecommended:
      "Sometimes you just need to talk it out before you commit. This call helps you feel safe and seen.",
    reason: "here-for-chicken",
  },
  {
    id: 32,
    type: "coach",
    title: "45 min Intro Call with Life And Career Coach",
    name: "Leanne Lindsey - Life Coach",
    description:
      "You might be at a turning point in your life where you want to do something meaningful, or  feel stuck, lost and frustrated. This session is designed to help you find clarity and direction.",
    location: "Phone call or voice note exchange",
    availability: "Flexible schedule",
    price: "Free with our membership 💖",
    icon: Flower,
    color: "from-blue-400 to-violet-500",
    image: "🌌",
    videoUrl: "https://player.vimeo.com/video/948230362", //change
    imageUrl: "/preview-life-coach.png", //change
    socialCredential:
      "Spiritual guide + energy practitioner with cultural humility",
    whyRecommended:
      "Health is also about setting healthy boundaries, creating self care routines and reconnecting to what matters to you. This session helps you realign.",
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
