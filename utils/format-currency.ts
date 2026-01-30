


export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('INR', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}