import {getFromStorage, saveToStorage} from './AsyncStorage';
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
};
