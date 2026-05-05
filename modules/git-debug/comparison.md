# Comparación de herramientas por lenguaje

Git y CLI son agnósticos al lenguaje. Las diferencias aparecen en **cómo debuggeás** y **cómo leés stack traces**.

## Stack Traces

### JavaScript / TypeScript
```
TypeError: Cannot read properties of undefined (reading 'price')
    at calculateTotal (order.js:14:28)
    at processOrder (order.js:42:5)
```
- Error en runtime, tipado opcional
- Con TS: el compilador atrapa muchos antes de ejecutar
- `undefined` es el error más común — JS no te obliga a manejar ausencia de valor

### Python
```
Traceback (most recent call last):
  File "order.py", line 7, in <module>
    process_order(order)
  File "order.py", line 42, in process_order
    total = calculate_total(order)
  File "order.py", line 14, in calculate_total
    return item['price'] * item['qty']
KeyError: 'price'
```
- Se lee **de arriba hacia abajo** (al revés que JS)
- El error específico está al FINAL del traceback
- `KeyError` en vez de `TypeError` — Python distingue más precisamente

### Go
```
goroutine 1 [running]:
main.calculateTotal(...)
    /home/user/order.go:14 +0x6b
main.processOrder(...)
    /home/user/order.go:42 +0x3a
```
- No hay excepciones — los errores son **valores de retorno**
- Si hay un panic (equivalente a crash), sí hay stack trace
- En código Go bien escrito, los errores se manejan explícitamente **antes** de llegar al stack trace

## La diferencia filosófica

| Lenguaje | Filosofía de errores |
|----------|---------------------|
| JS/TS | "Algo falló en runtime" — el error llega cuando ya es tarde |
| Python | "Algo falló en runtime, pero te doy contexto detallado" |
| Go | "Los errores son parte del contrato — manejálos antes de que exploten" |

Go es el único donde leer un stack trace es señal de que algo salió **muy** mal (un panic). En JS y Python es el workflow normal.

## Debugging

| Herramienta | JS/TS | Python | Go |
|-------------|-------|--------|-----|
| Breakpoints | Chrome DevTools / VS Code debugger | `pdb` / VS Code | `dlv` (Delve) |
| Print debug | `console.log` | `print` / `pprint` | `fmt.Println` |
| REPL | `node` | `python` / `ipython` | no hay REPL nativo |
| Profiler | `--prof` flag / clinic.js | `cProfile` | `pprof` |

La técnica es la misma en los tres: **aislar → reproducir → verificar hipótesis → corregir**.
