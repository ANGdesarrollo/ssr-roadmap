# DevShop — Invariantes y Reglas de Negocio

Estas reglas son verdades que el sistema NUNCA debe violar.
Son el punto de partida para escribir tests: si una invariante se rompe, hay un bug.

---

## Dinero
- Todos los montos se almacenan en **centavos (integer)**. Sin excepción.
- `1000` = $10.00
- Nunca usar `float` para dinero. Nunca.
- El redondeo (si aplica) se hace una sola vez, al final, no en cada operación.

## Stock
- `availableQty` nunca puede ser negativo.
- `reservedQty` nunca puede ser mayor a `availableQty + reservedQty`.
- Dos usuarios no pueden reservar el mismo último ítem. La reserva es transaccional.

## Órdenes
- Una `Order` empieza en `draft`.
- Transiciones válidas: `draft → confirmed → paid`, `draft → cancelled`, `confirmed → cancelled`, `paid → refunded`.
- Una orden `paid` no puede volver atrás salvo `refunded`.
- Los `OrderItem` son snapshots: el precio y nombre se toman al momento de crear la orden.
- `totalCents` debe ser igual a `sum(unitPriceCentsSnapshot * quantity)` para todos los items.

## Pagos
- Mismo `idempotencyKey` en `PaymentAttempt` = mismo resultado, sin cobrar dos veces.
- Un `Payment` puede tener múltiples `PaymentAttempt` (retries).
- Solo un `PaymentAttempt` puede estar en estado `success` por `Payment`.

## Autorización
- Un `customer` solo puede ver, crear y cancelar SUS PROPIAS órdenes.
- Un `support` puede ver todas las órdenes pero no reembolsar.
- Un `admin` puede hacer todo.
- Estar autenticado no implica estar autorizado para el recurso específico.

## Notificaciones
- Si una `Notification` falla, se reintenta con backoff exponencial.
- Máximo 3 intentos antes de `dead letter`.
- Procesar la misma `Notification` dos veces no debe duplicar el envío (idempotencia).

## Eventos
- Todo evento importante genera un `DomainEvent`.
- Los `OutboxMessage` se crean en la misma transacción que el cambio de estado.
- Un `OutboxMessage` no enviado no puede bloquear la transacción principal.

## Auditoría
- Toda acción sensible (cancelar orden, reembolso, suspender usuario) genera `AuditLog`.
- Los `AuditLog` son append-only. Nunca se modifican.
