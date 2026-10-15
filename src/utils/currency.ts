/**
 * Indian Rupee (INR) currency formatting utility
 */
export const formatINR = (amount: number, showDecimals = false): string => {
  if (isNaN(amount)) return '₹0';
  
  if (showDecimals) {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
  
  return `₹${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 0
  })}`;
};

export const formatINRWithDecimals = (amount: number): string => {
  return formatINR(amount, true);
};
