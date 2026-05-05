# Rúbrica — Ejercicio 1

| Criterio | Peso | Indicadores |
|----------|-----:|-------------|
| Evidencia TDD (Red/Green/Refactor) | 25% | Output de test fallando pegado antes del código |
| Correctitud funcional | 25% | Todos los casos del contrato cubiertos y pasando |
| Edge cases relevantes | 20% | Log vacío, sin archivos, duplicados, línea malformada |
| Diseño simple y mantenible | 15% | Función pura, sin `any`, nombres descriptivos |
| Idiomaticidad TypeScript | 10% | Tipos explícitos, no usar `as any`, `unknown` bien usado |
| Reflexión comparativa | 5% | Menciona diferencia real con Python/Go, no solo sintaxis |

## Bloqueantes automáticos
- Sin evidencia de Red → veredicto máximo REVISAR
- Usa `any` en el tipo de retorno o parámetros → señalarlo como mejora obligatoria
- Tests acoplados a implementación interna (ej: testear el regex directamente) → bloqueante
