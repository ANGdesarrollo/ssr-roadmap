# ¿Qué problema resuelve Git, Debug & CLI?

## El problema real

Un junior sin este módulo hace esto:

- Trabaja en `main` directamente → rompe el repo compartido
- Cuando algo falla en prod, no sabe reconstruir qué pasó → depende de alguien más
- Sus commits dicen `"fix"`, `"wip"`, `"asdf"` → el historial es inútil para el equipo
- Cuando hay un stack trace, lo copia en ChatGPT en vez de leerlo → nunca aprende a diagnosticar
- Usa la terminal solo para `ls` y `cd` → pierde el 80% de su potencia

Este módulo ataca exactamente eso: **herramientas de trabajo real en un equipo real**.

---

## Git: no es solo `add`, `commit`, `push`

Git es un grafo de commits. Cuando entendés eso, todo lo demás tiene sentido.

```
main:     A --- B --- C
                      \
feature:               D --- E
```

- `merge`: junta D y E en main creando un commit de merge. Preserva historia, visible en el log.
- `rebase`: mueve D y E encima de C, como si siempre hubieran nacido ahí. Historia más limpia.
- `cherry-pick`: agarra un commit específico (E) y lo aplica en otra branch.
- `reset`: mueve el puntero HEAD. `--soft` conserva cambios staged. `--hard` los destruye.

**Cuándo usar cada uno:**
| Situación | Herramienta |
|-----------|-------------|
| Actualizar feature branch con cambios de main | `rebase` (history limpio) |
| Mergear una feature terminada | `merge` (preserva contexto del trabajo) |
| Traer un fix urgente de otra branch | `cherry-pick` |
| Deshacer el último commit sin perder código | `reset --soft HEAD~1` |
| Quiero matar TODO y volver al estado anterior | `reset --hard` (destructivo) |

---

## Lectura de Stack Traces

Un stack trace es el mapa del crimen. Se lee **de abajo hacia arriba** para entender el contexto, y **de arriba hacia abajo** para encontrar la causa real.

```
TypeError: Cannot read properties of undefined (reading 'price')
    at calculateTotal (order.js:14:28)   ← AQUÍ está el error
    at processOrder (order.js:42:5)      ← esto llamó a calculateTotal
    at Object.<anonymous> (index.js:7:1) ← esto llamó a processOrder
```

**Las tres preguntas:**
1. ¿Qué tipo de error es? (`TypeError`, `ReferenceError`, `SyntaxError`)
2. ¿En qué archivo y línea ocurrió?
3. ¿Quién llamó a esa función? (el call stack)

---

## CLI como herramienta real

No es solo terminal — es velocidad y automatización:

```bash
# Buscar en qué commits se tocó un archivo
git log --oneline -- src/orders/order.service.ts

# Quién escribió cada línea de un archivo
git blame src/orders/order.service.ts

# Qué cambió entre dos commits
git diff abc123 def456 -- src/orders/

# Buscar en qué commit apareció un bug (bisect)
git bisect start
git bisect bad          # el bug está aquí
git bisect good v1.0    # acá no había bug
# Git te va preguntando hasta encontrar el commit exacto
```

---

## La diferencia filosófica

Git no es un backup — es **comunicación con el equipo en el tiempo**. Un commit claro le dice a tu yo del futuro (y a tus compañeros) *por qué* se hizo ese cambio, no solo *qué* cambió. El diff ya muestra el qué; el mensaje explica el porqué.
