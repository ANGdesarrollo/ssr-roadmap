---
### Ejercicio 1 — Git History Parser · Básico
**Módulo:** git-debug | **Lenguaje:** TypeScript
**Concepto central:** Parseo de output de CLI + transformación de datos | **Tiempo sugerido:** 45 min

---

**Contexto:**

En DevShop, el equipo quiere saber qué archivos fueron modificados más frecuentemente en el último mes para priorizar code reviews. El líder técnico corre `git log --name-only` y te pasa el output como string. Tu tarea: parsearlo y devolver un resumen útil.

Este ejercicio es sobre leer y transformar texto estructurado — exactamente lo que hacés cuando integrás herramientas de CLI en scripts de automatización.

---

**Contrato de comportamiento:**

| Input | Output esperado | Por qué |
|-------|----------------|---------|
| Log con 3 commits, cada uno tocando distintos archivos | Array de objetos `{ hash, message, files[] }` | Estructura navegable |
| Log con un commit que tocó el mismo archivo dos veces (merge) | El archivo aparece una sola vez en `files` | Sin duplicados |
| Log vacío (`""`) | Array vacío `[]` | Caso borde válido |
| Log con commit sin archivos (commit de merge vacío) | Objeto con `files: []` | No crashear |
| Hash incompleto o línea malformada | Ignorar esa línea, continuar | Resiliente a ruido |

---

**Tu tarea:**

Implementá la función `parseGitLog(rawLog: string): CommitEntry[]` donde:

```ts
type CommitEntry = {
  hash: string;      // los primeros 7 caracteres
  message: string;   // el mensaje del commit
  files: string[];   // archivos modificados, sin duplicados
};
```

El formato del input es exactamente el output de:
```bash
git log --pretty=format:"%h %s" --name-only
```

Ejemplo de input:
```
a1b2c3d feat: add order validation
src/orders/order.service.ts
src/orders/order.dto.ts

e4f5g6h fix: correct price calculation
src/orders/order.service.ts

i7j8k9l chore: update dependencies

```

Cada commit está separado por una línea en blanco. La primera línea del bloque es `hash message`. Las siguientes son archivos (pueden ser 0 o más).

---

**Restricciones:**
- [ ] Test primero — sin el Red no se revisa el código
- [ ] Sin IA para el código
- [ ] No testear detalles internos (no testees regex internas, no testees cómo spliteas)
- [ ] Usar TypeScript estricto — no usar `any`
- [ ] La función debe ser pura — mismo input, mismo output, sin side effects

---

**Casos mínimos a cubrir:**
- Caso feliz: log con 2-3 commits normales
- Commit sin archivos (solo hash + mensaje)
- Log vacío
- Archivo duplicado dentro del mismo commit
- Línea malformada (ignorar sin crashear)

---

**Código base:**

```ts
// src/git-log-parser.ts

export type CommitEntry = {
  hash: string;
  message: string;
  files: string[];
};

export function parseGitLog(rawLog: string): CommitEntry[] {
  // tu implementación acá
}
```

```ts
// src/git-log-parser.test.ts
import { describe, it, expect } from 'vitest';
import { parseGitLog } from './git-log-parser';

describe('parseGitLog', () => {
  it('TODO: escribí tu primer test acá', () => {
    // arrange
    // act
    // assert
  });
});
```

---

**Setup:**
```bash
mkdir -p exercises/01-git-history-parser/src
cd exercises/01-git-history-parser
npm init -y
npm install -D vitest typescript
npx tsc --init --strict
```

**Comandos:**
```bash
npx vitest run
# o en watch mode:
npx vitest
```

---

**Entregá:**
1. Output del test FALLANDO (Red) — pegá el texto del terminal
2. Implementación completa
3. Output del test PASANDO (Green) — pegá el texto del terminal
4. Refactor si hubo alguno (explicá qué y por qué)
5. En 2-3 líneas: ¿qué aprendiste? ¿cómo sería distinto en Python o Go?
