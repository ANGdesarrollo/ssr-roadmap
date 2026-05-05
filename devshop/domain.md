# DevShop — Dominio del Sistema de Ejercicios

Sistema de gestión de pedidos. Es el dominio transversal de todos los ejercicios de integración (ejercicio 5 de cada módulo).

---

## Entidades

### User
```
id: uuid
email: string
passwordHash: string
role: customer | admin | support
status: active | suspended
createdAt: datetime
```

### Product
```
id: uuid
name: string
description: string
priceCents: integer       # siempre en centavos, nunca floats
status: active | discontinued
createdAt: datetime
```

### Inventory
```
id: uuid
productId: uuid
availableQty: integer
reservedQty: integer
```
**Invariante:** `availableQty >= 0` siempre. Nunca stock negativo.

### Order
```
id: uuid
userId: uuid
status: draft | confirmed | paid | cancelled | expired
items: OrderItem[]
totalCents: integer
idempotencyKey: string    # para evitar doble creación
createdAt: datetime
```
**Invariante:** Una orden `paid` no puede volver a `confirmed`.

### OrderItem
```
id: uuid
orderId: uuid
productId: uuid
productNameSnapshot: string   # snapshot al momento de la orden
unitPriceCentsSnapshot: integer
quantity: integer
```
> El snapshot es crítico: si el producto cambia de precio mañana, la orden histórica no cambia.

### Payment
```
id: uuid
orderId: uuid
status: pending | authorized | captured | failed | refunded
totalCents: integer
```

### PaymentAttempt
```
id: uuid
paymentId: uuid
provider: string            # stripe | mercadopago
providerReference: string
status: success | failed
errorCode: string?
idempotencyKey: string
createdAt: datetime
```
**Invariante:** Dos intentos con el mismo `idempotencyKey` no deben cobrar dos veces.

### Notification
```
id: uuid
userId: uuid
type: order_confirmed | payment_failed | order_cancelled
status: pending | sent | failed
payload: json
attempts: integer
createdAt: datetime
```

### Role / Permission
```
Roles: customer | admin | support
Reglas:
  customer → solo ve sus propias órdenes
  support  → ve todas las órdenes, no puede reembolsar
  admin    → acceso completo
```
**Invariante clave:** Estar autenticado NO implica estar autorizado para ese recurso específico.

### DomainEvent
```
id: uuid
type: OrderPaid | OrderCancelled | PaymentFailed | StockReserved
aggregateId: uuid
payload: json
occurredAt: datetime
```

### OutboxMessage
```
id: uuid
eventType: string
payload: json
status: pending | sent | failed
attempts: integer
nextRetryAt: datetime?
```

### AuditLog
```
id: uuid
actorUserId: uuid
action: string
resourceType: string
resourceId: uuid
metadata: json
createdAt: datetime
```

---

## Invariantes del Sistema

1. **Stock nunca negativo** — `availableQty >= 0` siempre
2. **Snapshots inmutables** — precio y nombre en OrderItem no cambian con el catálogo
3. **Idempotencia en pagos** — mismo `idempotencyKey` no genera doble cobro
4. **Ownership** — un customer solo puede operar sobre sus propias órdenes
5. **Estados válidos** — las transiciones de estado son finitas y explícitas
6. **Centavos, no floats** — todo monto se almacena en centavos (integer)

---

## Flujo principal

```
User crea Order (draft)
  → reserva Stock (StockReservation)
  → confirma Order (confirmed)
  → inicia Payment (pending)
    → PaymentAttempt
    → éxito: Order → paid, Payment → captured
      → DomainEvent: OrderPaid
      → OutboxMessage → Worker → Notification (order_confirmed)
    → fallo: PaymentAttempt failed, retry
      → Notification (payment_failed)
  → Order puede cancelarse → libera Stock
```

---

## Contratos compartidos

Los contratos viven en `devshop/contracts/` como archivos JSON.
Los tres lenguajes (TS, Python, Go) implementan el mismo comportamiento contra los mismos contratos.

Ver: `contracts/README.md`

---

## Checkpoints del sistema

El sistema crece por etapas. Cada módulo integra en su etapa correspondiente.

| Stage | Qué existe | Módulos típicos |
|-------|-----------|----------------|
| 0 | fixtures + funciones puras | git-debug, lang-fundamentals, tdd-onboarding |
| 1 | use cases + in-memory repos | tdd-foundations, error-handling |
| 2 | NestJS + HTTP sin DB real | typescript-node-nest, http-protocols, api-design |
| 3 | PostgreSQL + migrations | db-basic, testing-real, db-advanced |
| 4 | auth + jobs + concurrencia | authn-authz, backend-security, async-concurrency, background-jobs |
| 5 | observabilidad + performance | architecture, devops-basic, observability, performance |

Los checkpoints oficiales están en `devshop/checkpoints/`.
Si el código anterior quedó con deuda, se arranca desde el checkpoint, no desde el código roto.
