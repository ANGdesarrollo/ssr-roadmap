---
### Ejercicio 3 — Stack Trace Parser · Intermedio
**Módulo:** git-debug | **Lenguaje:** Go
**Concepto central:** Parseo de stack traces + manejo de errores explícito en Go | **Tiempo sugerido:** 60 min

---

**Contexto:**

El equipo de DevShop tiene un script de monitoreo que lee logs de producción de Node.js y los agrega. Necesitás escribir un parser de stack traces de Node.js en Go — el lenguaje del script de monitoreo.

Este ejercicio tiene dos objetivos:
1. Entender la estructura de un stack trace (cuándo leerlo de arriba abajo vs abajo arriba)
2. Vivir la filosofía Go: **errores son valores, no excepciones**

---

**Contrato de comportamiento:**

| Input | Output esperado | Por qué |
|-------|----------------|---------|
| Stack trace válido de Node.js | `StackTrace{ ErrorType, Message, Frames[] }`, `nil` error | Parseo exitoso |
| String vacío | `nil`, error `"empty input"` | Error explícito |
| String que no es stack trace | `nil`, error `"not a stack trace"` | Error explícito |
| Stack trace con 1 frame | `StackTrace` con 1 frame | Caso mínimo válido |
| Frame con ruta absoluta de sistema | La ruta se preserva tal cual | No normalizar paths |

---

**Formato del stack trace de Node.js:**
```
TypeError: Cannot read properties of undefined (reading 'price')
    at calculateTotal (order.js:14:28)
    at processOrder (order.js:42:5)
    at Object.<anonymous> (index.js:7:1)
```

La primera línea es siempre `ErrorType: Message`. Las siguientes empiezan con `    at `.

---

**Tu tarea:**

```go
package stacktrace

type Frame struct {
    Function string // "calculateTotal"
    File     string // "order.js"
    Line     int    // 14
    Column   int    // 28
}

type StackTrace struct {
    ErrorType string  // "TypeError"
    Message   string  // "Cannot read properties of undefined (reading 'price')"
    Frames    []Frame
}

func Parse(input string) (*StackTrace, error) {
    // tu implementación
}
```

---

**Restricciones:**
- [ ] Test primero — sin el Red no se revisa el código
- [ ] Sin IA para el código
- [ ] Correr con `go test -race ./...` — no solo `go test`
- [ ] Los errores deben ser descriptivos — nada de `fmt.Errorf("error")`
- [ ] No usar `panic` para manejar casos esperados
- [ ] Usar `strconv.Atoi` para convertir línea/columna, manejar el error explícitamente

---

**Casos mínimos a cubrir:**
- Stack trace completo con 3+ frames
- Input vacío → error
- Input sin líneas `at` → error
- Frame con función anónima (`Object.<anonymous>`)
- Línea/columna no numérica → manejar sin crashear

---

**Setup:**
```bash
mkdir -p exercises/03-stack-trace-parser
cd exercises/03-stack-trace-parser
go mod init stacktrace
touch stacktrace.go stacktrace_test.go
```

**Comandos:**
```bash
go test ./...
go test -race ./...   # obligatorio antes de entregar
go test -v ./...      # verbose
```

---

**Entregá:**
1. Output del test FALLANDO (Red) — incluí el output de `go test`
2. Implementación completa
3. Output del test PASANDO (Green) — incluí `go test -race`
4. Refactor si hubo
5. En 2-3 líneas: ¿cómo cambió tu forma de pensar el manejo de errores comparado con TS y Python? ¿Por qué Go te obliga a pensar esto diferente?
