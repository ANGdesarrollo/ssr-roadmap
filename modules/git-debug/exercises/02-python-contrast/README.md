---
### Ejercicio 2 — Commit Message Analyzer · Básico+
**Módulo:** git-debug | **Lenguaje:** Python
**Concepto central:** Mismo parseo de historial + análisis de mensajes de commit | **Tiempo sugerido:** 45 min

---

**Contexto:**

Mismo dominio que el Ejercicio 1, pero ahora el equipo quiere además **validar la calidad de los mensajes de commit** según Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).

El objetivo no es solo parsear — es analizar y clasificar. En Python, esto se hace de manera distinta a TypeScript: `dataclasses`, comprensiones de lista, y la stdlib son tus aliados.

---

**Contrato de comportamiento:**

| Input | Output esperado | Por qué |
|-------|----------------|---------|
| Mensaje `"feat: add order validation"` | `{ type: "feat", valid: True, description: "add order validation" }` | Conventional commit válido |
| Mensaje `"fix something broken"` | `{ type: None, valid: False, description: "fix something broken" }` | Sin prefijo convencional |
| Mensaje `""` | `{ type: None, valid: False, description: "" }` | Vacío |
| Log con 5 commits: 3 válidos, 2 inválidos | `{ valid_count: 3, invalid_count: 2, by_type: {"feat": 2, "fix": 1} }` | Resumen agregado |
| Tipo desconocido `"wtf: broke everything"` | `{ type: "wtf", valid: False, ... }` | Prefijo existe pero no es convencional |

---

**Tu tarea:**

Implementá dos funciones:

```python
def parse_commit_message(message: str) -> CommitMessage:
    ...

def analyze_log(raw_log: str) -> LogSummary:
    ...
```

Con estos tipos (usá `dataclasses`):

```python
from dataclasses import dataclass, field
from typing import Optional

VALID_TYPES = {"feat", "fix", "chore", "docs", "refactor", "test", "perf", "ci"}

@dataclass
class CommitMessage:
    type: Optional[str]
    valid: bool
    description: str

@dataclass
class LogSummary:
    valid_count: int
    invalid_count: int
    by_type: dict[str, int]
```

---

**Restricciones:**
- [ ] Test primero — sin el Red no se revisa el código
- [ ] Sin IA para el código
- [ ] Usar `dataclasses`, no dicts planos para los tipos
- [ ] No usar regex para el parseo del tipo — hay una forma más simple y legible en Python
- [ ] Funciones puras — sin side effects

---

**Casos mínimos a cubrir:**
- Mensaje conventional commit válido
- Mensaje sin prefijo
- Mensaje vacío
- Tipo conocido con descripción vacía (ej: `"feat:"`)
- Log con mix de válidos e inválidos

---

**Setup:**
```bash
mkdir -p exercises/02-commit-analyzer
cd exercises/02-commit-analyzer
uv init
uv add --dev pytest
```

**Comandos:**
```bash
uv run pytest
uv run pytest -v   # verbose
```

---

**Entregá:**
1. Output del test FALLANDO (Red)
2. Implementación completa
3. Output del test PASANDO (Green)
4. Refactor si hubo
5. En 2-3 líneas: ¿qué fue distinto respecto al Ejercicio 1 en TS? ¿Qué hace Python más legible acá y qué hace menos?
