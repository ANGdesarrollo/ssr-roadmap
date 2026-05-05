---
### Ejercicio 4 — Debug & Fix una API rota · Aplicado
**Módulo:** git-debug | **Lenguaje:** TypeScript
**Concepto central:** Debugging real — reproducir el bug con un test ANTES de corregirlo | **Tiempo sugerido:** 75 min

---

**Contexto:**

Llegás un lunes y encontrás esto en los logs de producción de DevShop:

```
[ERROR] 2024-01-15T09:23:41.123Z - Unhandled error in POST /orders
TypeError: Cannot read properties of undefined (reading 'priceCents')
    at calculateOrderTotal (order-calculator.ts:23:45)
    at OrderService.create (order.service.ts:67:18)
    at OrdersController.create (orders.controller.ts:34:5)
TypeError: items.reduce is not a function
    at calculateOrderTotal (order-calculator.ts:19:22)
    at OrderService.create (order.service.ts:67:18)
```

Hay **dos bugs distintos** en el mismo archivo. Tu trabajo:
1. Leer el stack trace y entender QUÉ está fallando
2. Escribir un test que reproduzca cada bug (Red)
3. Corregir el código (Green)
4. Asegurarte de que el fix no rompe nada más

---

**Código roto que te damos:**

```ts
// src/order-calculator.ts

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
    const discount = subtotal * order.discountPercent;  // BUG 1
    return subtotal - discount;
  }

  return subtotal;
}

export function getExpensiveItems(order: Order, thresholdCents: number): OrderItem[] {
  return order.items
    .filter(item => item.priceCents > thresholdCents)
    .sort((a, b) => a.priceCents - b.priceCents);  // BUG 2: ¿está bien el sort?
}

export function applyBulkDiscount(items: any): number {  // BUG 3: tipo roto
  const total = items.reduce((sum: number, item: OrderItem) => {
    return sum + item.priceCents * item.quantity;
  }, 0);

  if (total > 100000) {
    return total * 0.9;
  }
  return total;
}
```

---

**Tu tarea:**

1. **Antes de tocar el código**: identificá los 3 bugs leyendo el código y el stack trace
2. **Escribí un test que falle** por cada bug (Red) — el test es la evidencia de que entendés el problema
3. **Corregí el código** (Green)
4. **Refactor**: `applyBulkDiscount` tiene un tipo horrible — arreglalo

---

**Restricciones:**
- [ ] Test que reproduce el bug PRIMERO — sin el Red no se revisa
- [ ] Sin IA para el código
- [ ] El mensaje del test debe describir el bug, no el fix: `"should apply 10% discount, not 10x discount"`
- [ ] No cambies el comportamiento observable de `getExpensiveItems` sin entender primero cuál es el correcto

---

**Casos que deben cubrir tus tests:**
- `calculateOrderTotal` con descuento del 10% → ¿cuánto debería dar?
- `calculateOrderTotal` sin descuento
- `getExpensiveItems` → ¿el orden ascendente o descendente tiene sentido para "más caros"?
- `applyBulkDiscount` con `items` como `undefined` (el caso del stack trace original)
- `applyBulkDiscount` con bulk discount activado y sin activar

---

**Setup:**
```bash
mkdir -p exercises/04-debug-fix/src
cd exercises/04-debug-fix
npm init -y
npm install -D vitest typescript
```

**Comandos:**
```bash
npx vitest run
```

---

**Entregá:**
1. Tu análisis inicial: ¿cuáles son los 3 bugs y cómo los identificaste? (2-3 líneas por bug)
2. Output de los tests FALLANDO (Red) — uno por bug
3. Código corregido
4. Output de los tests PASANDO (Green)
5. En 2-3 líneas: ¿cuál fue el bug más sutil? ¿Por qué TDD ayuda específicamente en debugging?

> **Nota:** Este ejercicio usa debate con GPT en la evaluación. Asegurate de no tener variables de entorno ni credenciales en el código que entregás.
