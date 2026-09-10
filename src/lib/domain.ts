export const MASK_REGEX = /((?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;

export function checkMessageMasking(text: string): boolean {
  return MASK_REGEX.test(text);
}

export function isTokenValid(token: string): boolean {
  return token.length >= 10 && token.startsWith('HANDOVER-');
}

export function calculateExpiryState(createdAt: Date, windowDays: number, now: Date) {
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + windowDays);
  
  const graceEndDate = new Date(expiryDate);
  graceEndDate.setDate(graceEndDate.getDate() + 7);

  if (now > graceEndDate) {
    return 'archived';
  } else if (now > expiryDate) {
    return 'closing';
  } else {
    // Check if within last 14 days
    const expiringThreshold = new Date(expiryDate);
    expiringThreshold.setDate(expiringThreshold.getDate() - 14);
    if (now >= expiringThreshold) {
      return 'expiring';
    }
    return 'active';
  }
}
