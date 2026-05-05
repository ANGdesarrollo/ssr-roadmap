# DevShop — Contratos Compartidos

Cada archivo JSON define casos de comportamiento esperado.
Los tres lenguajes (TypeScript, Python, Go) implementan el mismo comportamiento contra estos contratos.

## Formato

```json
[
  {
    "name": "descripción del caso",
    "input": { ... },
    "expected": { ... }
  },
  {
    "name": "caso de error",
    "input": { ... },
    "error": "ERROR_CODE"
  }
]
```

## Contratos disponibles

| Archivo | Qué define | Módulo principal |
|---------|-----------|-----------------|
| `order-pricing.cases.json` | cálculo de total de orden | lang-fundamentals |
| `create-order.cases.json` | validación para crear una orden | tdd-foundations |
| `error-classification.cases.json` | clasificar tipo de error | error-handling |
| `stock-reservation.cases.json` | reserva de stock concurrente | async-concurrency, db-advanced |
| `payment-idempotency.cases.json` | idempotencia en intentos de pago | background-jobs |
| `authorization.cases.json` | quién puede hacer qué | authn-authz |
