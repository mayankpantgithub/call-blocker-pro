import { MMKV } from 'react-native-mmkv';

// Initialize MMKV storage
const storage = new MMKV({
  id: 'call-blocker-storage',
});

// Types
export interface BlockedNumber {
  id: string;
  number: string;
  label?: string;
  addedAt: number;
}

export interface BlockList {
  id: string;
  name: string;
  numbers: string[];
  createdAt: number;
}

export interface RegexPattern {
  id: string;
  pattern: string;
  description: string;
  enabled: boolean;
  createdAt: number;
}

// Keys
const BLOCKED_NUMBERS_KEY = 'blocked_numbers';
const BLOCK_LISTS_KEY = 'block_lists';
const REGEX_PATTERNS_KEY = 'regex_patterns';

// Blocked Numbers
export const getBlockedNumbers = (): BlockedNumber[] => {
  const data = storage.getString(BLOCKED_NUMBERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBlockedNumbers = (numbers: BlockedNumber[]) => {
  storage.set(BLOCKED_NUMBERS_KEY, JSON.stringify(numbers));
};

export const addBlockedNumber = (number: BlockedNumber) => {
  const numbers = getBlockedNumbers();
  numbers.push(number);
  saveBlockedNumbers(numbers);
};

export const removeBlockedNumber = (id: string) => {
  const numbers = getBlockedNumbers().filter(n => n.id !== id);
  saveBlockedNumbers(numbers);
};

// Block Lists
export const getBlockLists = (): BlockList[] => {
  const data = storage.getString(BLOCK_LISTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBlockLists = (lists: BlockList[]) => {
  storage.set(BLOCK_LISTS_KEY, JSON.stringify(lists));
};

export const addBlockList = (list: BlockList) => {
  const lists = getBlockLists();
  lists.push(list);
  saveBlockLists(lists);
};

export const updateBlockList = (id: string, updatedList: Partial<BlockList>) => {
  const lists = getBlockLists();
  const index = lists.findIndex(l => l.id === id);
  if (index !== -1) {
    lists[index] = { ...lists[index], ...updatedList };
    saveBlockLists(lists);
  }
};

export const removeBlockList = (id: string) => {
  const lists = getBlockLists().filter(l => l.id !== id);
  saveBlockLists(lists);
};

// Regex Patterns
export const getRegexPatterns = (): RegexPattern[] => {
  const data = storage.getString(REGEX_PATTERNS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRegexPatterns = (patterns: RegexPattern[]) => {
  storage.set(REGEX_PATTERNS_KEY, JSON.stringify(patterns));
};

export const addRegexPattern = (pattern: RegexPattern) => {
  const patterns = getRegexPatterns();
  patterns.push(pattern);
  saveRegexPatterns(patterns);
};

export const updateRegexPattern = (id: string, updatedPattern: Partial<RegexPattern>) => {
  const patterns = getRegexPatterns();
  const index = patterns.findIndex(p => p.id === id);
  if (index !== -1) {
    patterns[index] = { ...patterns[index], ...updatedPattern };
    saveRegexPatterns(patterns);
  }
};

export const removeRegexPattern = (id: string) => {
  const patterns = getRegexPatterns().filter(p => p.id !== id);
  saveRegexPatterns(patterns);
};

// Get all numbers for Call Directory Extension
export const getAllBlockedNumbersForExtension = (): string[] => {
  const blocked = getBlockedNumbers().map(n => n.number);
  const fromLists = getBlockLists().flatMap(list => list.numbers);
  
  // Remove duplicates
  return Array.from(new Set([...blocked, ...fromLists]));
};

// Clear all data
export const clearAllData = () => {
  storage.delete(BLOCKED_NUMBERS_KEY);
  storage.delete(BLOCK_LISTS_KEY);
  storage.delete(REGEX_PATTERNS_KEY);
};