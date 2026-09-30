// Currency and Date Formatters

export const formatMoney = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 so‘m';
  return new Intl.NumberFormat('uz-UZ').format(Math.round(amount)) + ' so‘m';
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('uz-UZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch (e) {
    return dateStr;
  }
};

export const getRoleLabel = (role) => {
  switch (role) {
    case 'admin':
      return { label: 'Administrator', badgeClass: 'badge-danger' };
    case 'manager':
      return { label: 'Menejer / Murabbiy', badgeClass: 'badge-purple' };
    case 'student':
    default:
      return { label: 'Talaba / O‘quvchi', badgeClass: 'badge-primary' };
  }
};
