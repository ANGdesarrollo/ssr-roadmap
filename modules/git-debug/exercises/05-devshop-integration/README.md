---
### Ejercicio 5 — DevShop Stage 0: Git Audit Log · Integración
**Módulo:** git-debug | **Lenguaje:** TypeScript (funciones puras, Stage 0)
**Concepto central:** Conectar parseo de CLI al dominio DevShop — AuditLog con metadata de Git | **Tiempo sugerido:** 75 min

---

**Contexto:**

DevShop Stage 0: solo fixtures y funciones puras. No hay framework, no hay DB, no hay HTTP.

El equipo de compliance quiere que ciertos cambios en el código del sistema de órdenes queden registrados en el `AuditLog` de DevShop. Cuando alguien hace un commit que toca archivos del dominio de órdenes (`src/orders/**`), se debe generar una entrada de auditoría.

Tu tarea: una función pura que recibe el output de `git log` y devuelve las entradas de `AuditLog` correspondientes.

---

**Dominio DevShop (Stage 0) — lo que existe:**

```ts
// devshop/domain.ts (ya existe, no modificar)
export type AuditLog = {
  id: string;
  entityType: 'order' | 'payment' | 'user' | 'system';
  entityId: string;
  action: string;
  actorId: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
};
```

Los fixtures disponibles están en `devshop/fixtures/`.

---

**Contrato de comportamiento:**

| Input | Output esperado | Por qué |
|-------|----------------|---------|
| Log con commit que toca `src/orders/order.service.ts` | 1 entrada AuditLog con `entityType: "system"`, `action: "code_change"` | Cambio en dominio de órdenes |
| Log con commit que toca solo `src/payments/` | 0 entradas | No es dominio de órdenes |
| Log con 2 commits ambos tocando `src/orders/` | 2 entradas | Una por commit |
| Commit sin archivos (merge commit) | 0 entradas | Sin cambios de código |
| Log vacío | Array vacío | Caso borde |

---

**Tu tarea:**

```ts
// src/git-audit-log.ts

import { AuditLog } from '../devshop/domain';
import { CommitEntry } from './git-log-parser'; // del Ejercicio 1

export function generateAuditLogs(
  commits: CommitEntry[],
  domainPath: string,    // ej: "src/orders"
  actorId: string,       // quién hizo los commits (simplificado)
): AuditLog[];
```

Cada `AuditLog` generado debe tener:
- `entityType: "system"`
- `entityId: commitHash`
- `action: "code_change"`
- `actorId`: el que se recibe como parámetro
- `metadata`: `{ commitMessage, filesChanged: string[], domainPath }`
- `createdAt`: `new Date()` — acepto que no es determinístico en tests, usá `expect.any(Date)`

---

**Restricciones:**
- [ ] Test primero — sin el Red no se revisa
- [ ] Sin IA para el código
- [ ] Reusar `parseGitLog` del Ejercicio 1 — no reimplementar el parseo
- [ ] La función debe ser pura excepto por `new Date()` — sin side effects
- [ ] No modificar `devshop/domain.ts`
- [ ] `id` del AuditLog: usá `crypto.randomUUID()` o un formato `audit-{hash}-{timestamp}`

---

**Casos mínimos a cubrir:**
- Commits que tocan el domainPath → generan entradas
- Commits que no tocan el domainPath → se filtran
- Commit con múltiples archivos, algunos del domainPath y otros no → solo cuenta si AL MENOS uno es del domainPath
- Log vacío → array vacío

---

**Estructura esperada del proyecto:**
```
exercises/05-git-audit-log/
  src/
    git-log-parser.ts       ← del Ejercicio 1 (podés copiar)
    git-audit-log.ts        ← nuevo
    git-audit-log.test.ts   ← tus tests
  devshop/
    domain.ts               ← copiar de devshop/
```

**Comandos:**
```bash
npx vitest run
```

---

**Entregá:**
1. Output del test FALLANDO (Red)
2. Implementación
3. Output del test PASANDO (Green)
4. Refactor si hubo
5. En 2-3 líneas: ¿qué fue lo más interesante de conectar un concepto de tooling (Git) con el dominio del negocio (AuditLog)? ¿Qué pasa cuando `actorId` no se sabe? ¿Cómo lo modelarías?

> **Nota:** Este ejercicio usa debate con GPT. No incluyas credenciales ni `.env` en el código entregado.
