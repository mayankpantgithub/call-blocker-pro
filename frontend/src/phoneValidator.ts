import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export const formatPhoneNumber = (number: string, countryCode = 'US'): string | null => {
  try {
    // Remove any non-digit characters except +
    const cleaned = number.replace(/[^\d+]/g, '');
    
    if (isValidPhoneNumber(cleaned, countryCode as any)) {
      const phoneNumber = parsePhoneNumber(cleaned, countryCode as any);
      // Return in E.164 format (required for iOS Call Directory)
      return phoneNumber.format('E.164');
    }
    return null;
  } catch (error) {
    console.error('Phone validation error:', error);
    return null;
  }
};

export const validatePhoneNumber = (number: string, countryCode = 'US'): boolean => {
  try {
    const cleaned = number.replace(/[^\d+]/g, '');
    return isValidPhoneNumber(cleaned, countryCode as any);
  } catch {
    return false;
  }
};

export const parsePhoneNumbers = (text: string): string[] => {
  // Extract potential phone numbers from text
  const regex = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
  const matches = text.match(regex) || [];
  
  return matches
    .map(m => formatPhoneNumber(m))
    .filter((n): n is string => n !== null);
};