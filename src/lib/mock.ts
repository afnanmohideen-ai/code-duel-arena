export const currentUser = {
  name: "Aarav Sharma",
  handle: "@aarav",
  rating: 1840,
  rank: 42,
  wins: 87,
  losses: 31,
  draws: 6,
  streak: 5,
  prize: 12500,
  solved: 184,
};

export const leaderboard = [
  { rank: 1, name: "Priya Nair", handle: "@priya", rating: 2410, wins: 312, prize: 85000, country: "🇮🇳" },
  { rank: 2, name: "Rohan Mehta", handle: "@rohanm", rating: 2380, wins: 298, prize: 62000, country: "🇮🇳" },
  { rank: 3, name: "Ananya Iyer", handle: "@ananya", rating: 2295, wins: 271, prize: 48000, country: "🇮🇳" },
  { rank: 4, name: "Karan Singh", handle: "@karans", rating: 2204, wins: 245, prize: 32000, country: "🇮🇳" },
  { rank: 5, name: "Meera Pillai", handle: "@meerap", rating: 2150, wins: 233, prize: 24000, country: "🇮🇳" },
  { rank: 6, name: "Vikram Joshi", handle: "@vikram", rating: 2098, wins: 212, prize: 18500, country: "🇮🇳" },
  { rank: 7, name: "Sara Khan", handle: "@sarak", rating: 2042, wins: 198, prize: 14200, country: "🇮🇳" },
  { rank: 8, name: "Dev Patel", handle: "@devp", rating: 1995, wins: 187, prize: 11000, country: "🇮🇳" },
];

export const friends = [
  { name: "Rohan Mehta", handle: "@rohanm", rating: 2380, status: "online" as const },
  { name: "Sara Khan", handle: "@sarak", rating: 2042, status: "in-battle" as const },
  { name: "Dev Patel", handle: "@devp", rating: 1995, status: "online" as const },
  { name: "Nisha Rao", handle: "@nishar", rating: 1820, status: "offline" as const },
  { name: "Ishaan Kapoor", handle: "@ishaan", rating: 1755, status: "online" as const },
];

export const recentBattles = [
  { opponent: "Rohan Mehta", problem: "Two Sum", result: "win" as const, points: 100, time: "2m ago" },
  { opponent: "Sara Khan", problem: "Valid Parentheses", result: "loss" as const, points: 0, time: "1h ago" },
  { opponent: "Dev Patel", problem: "Merge Intervals", result: "win" as const, points: 150, time: "3h ago" },
  { opponent: "Meera Pillai", problem: "LRU Cache", result: "draw" as const, points: 25, time: "yesterday" },
];

export const sampleProblem = {
  title: "Two Sum",
  difficulty: "Easy",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ],
  constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
};

export const starterCode = `function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`;
