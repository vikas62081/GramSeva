import {getFromStorage, saveToStorage} from './AsyncStorage';
import {getRoleInfo, getStatusColor} from './auth';
import {formatDate, getTime, getTimeLeft, formatDateTime} from './datetime';
import {isAndroid, isIOS} from './device';
import {getFamilyDropdownOptions} from './family';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function capitalize(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function normalizeObjectStrings<T extends Record<string, any>>(obj: T): T {
  const trimmed: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') trimmed[key] = obj[key].trim();
    else trimmed[key] = obj[key];
  }
  return trimmed;
}

export {
  formatDate,
  getTime,
  formatDateTime,
  isIOS,
  isAndroid,
  saveToStorage,
  getFromStorage,
  getTimeLeft,
  getFamilyDropdownOptions,
  formatCurrency,
  getInitials,
  capitalize,
  getStatusColor,
  getRoleInfo,
  normalizeObjectStrings,
};
