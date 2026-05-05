# Módulo: Git, Debug & CLI

**Tier:** 0 | **Track:** tooling | **DevShop Stage:** 0

## Mapa del módulo

```
Ejercicio 1 — Git History Parser      · Básico       (TypeScript)
Ejercicio 2 — Commit Message Analyzer · Básico+      (Python)
Ejercicio 3 — Stack Trace Parser      · Intermedio   (Go)
Ejercicio 4 — Debug & Fix API rota    · Aplicado     (TypeScript) ← debate GPT
Ejercicio 5 — DevShop Git Audit Log   · Integración  (TypeScript) ← debate GPT
```

## Concepto clave

Git no es un backup — es comunicación con el equipo en el tiempo.
Un stack trace no es un error — es un mapa del crimen.
La CLI no es la terminal — es automatización en espera.

## Archivos

- `concept.md` — Explicación completa del módulo (leer antes del Ejercicio 1)
- `comparison.md` — Diferencias JS/Python/Go en debugging y stack traces
- `exercises/00-diagnostic/README.md` — Diagnóstico de nivel (responder antes del Ejercicio 1)
- `exercises/01-js-basic/` — Git History Parser en TypeScript
- `exercises/02-python-contrast/` — Commit Analyzer en Python
- `exercises/03-go-contrast/` — Stack Trace Parser en Go
- `exercises/04-applied/` — Debug & Fix (código roto incluido en `starter/`)
- `exercises/05-devshop-integration/` — Conectar Git al AuditLog de DevShop
- `reviews/` — Feedback de sesiones (se puebla al evaluar)

## Entregables del módulo

Al completar los 5 ejercicios debés poder:
- [ ] Resolver bugs en una API existente sin IA, explicando causa raíz
- [ ] Hacer un PR con descripción técnica útil
- [ ] Reconstruir qué pasó leyendo logs y stack traces

## Orden recomendado

1. Leé `concept.md`
2. Respondé el diagnóstico en `exercises/00-diagnostic/README.md`
3. Ejercicio 1 → esperar APROBADO → Ejercicio 2 → ...
4. Al completar el Ejercicio 5, marcar el nodo en el skill tree (`make dev`)
