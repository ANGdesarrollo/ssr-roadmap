// Este archivo tiene bugs intencionales — no lo corrijas antes de escribir los tests
// BUG HUNT: encontrá los 3 problemas leyendo el código y el stack trace del README

export type OrderItem = {
  productId: string;
  quantity: number;
  priceCents: number;
};

export type Order = {
  id: string;
  customerId: string;
  items: OrderItem[];
  discountPercent?: number;
};

export function calculateOrderTotal(order: Order): number {
  const subtotal = order.items.reduce((sum, item) => {
    return sum + item.priceCents * item.quantity;
  }, 0);

  if (order.discountPercent) {
    const discount = subtotal * order.discountPercent; // ← mirá este cálculo
    return subtotal - discount;
  }

  return subtotal;
}

export function getExpensiveItems(order: Order, thresholdCents: number): OrderItem[] {
  return order.items
    .filter(item => item.priceCents > thresholdCents)
    .sort((a, b) => a.priceCents - b.priceCents); // ← ¿este sort tiene sentido para "más caros"?
}

export function applyBulkDiscount(items: any): number { // ← ¿qué tipo debería ser esto?
  const total = items.reduce((sum: number, item: OrderItem) => {
    return sum + item.priceCents * item.quantity;
  }, 0);

  if (total > 100000) {
    return total * 0.9;
  }
  return total;
}
