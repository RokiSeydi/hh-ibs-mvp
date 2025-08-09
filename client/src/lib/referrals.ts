// Referral tracking utilities
export interface ReferralData {
  code: string;
  count: number;
  createdAt: string;
  friends: string[];
}

// Generate a unique referral code
export const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Save referral data to localStorage
export const saveReferralData = (data: ReferralData): void => {
  localStorage.setItem(`referral_${data.code}`, JSON.stringify(data));
};

// Load referral data from localStorage
export const loadReferralData = (code: string): ReferralData | null => {
  const saved = localStorage.getItem(`referral_${code}`);
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
};

// Initialize a new referral
export const createReferral = (): ReferralData => {
  const code = generateReferralCode();
  const data: ReferralData = {
    code,
    count: 0,
    createdAt: new Date().toISOString(),
    friends: [],
  };
  saveReferralData(data);
  return data;
};

// Add a friend to referral
export const addFriend = (code: string, friendEmail: string): boolean => {
  const data = loadReferralData(code);
  if (data && !data.friends.includes(friendEmail)) {
    data.friends.push(friendEmail);
    data.count = data.friends.length;
    saveReferralData(data);
    return true;
  }
  return false;
};

// Check if someone joined via referral
export const processReferral = (referralCode?: string): void => {
  if (referralCode) {
    // Check if this referral code exists
    const data = loadReferralData(referralCode);
    if (data) {
      // Mark this visit as a potential referral
      sessionStorage.setItem("referringCode", referralCode);
    }
  }
};

// Complete a referral when someone joins waitlist
export const completeReferral = (newUserEmail: string): string | null => {
  const referringCode = sessionStorage.getItem("referringCode");
  if (referringCode && newUserEmail) {
    const success = addFriend(referringCode, newUserEmail);
    if (success) {
      sessionStorage.removeItem("referringCode");
      return referringCode;
    }
  }
  return null;
};

// Get referral stats
export const getReferralStats = (code: string) => {
  const data = loadReferralData(code);
  if (data) {
    const spotsLeft = Math.max(0, 10 - data.count);
    const progressPercentage = (data.count / 10) * 100;
    const isComplete = data.count >= 10;

    return {
      count: data.count,
      spotsLeft,
      progressPercentage,
      isComplete,
      friends: data.friends,
    };
  }

  return {
    count: 0,
    spotsLeft: 10,
    progressPercentage: 0,
    isComplete: false,
    friends: [],
  };
};
