.PHONY: open dev help reset

## Abre el skill tree en el browser
open:
	xdg-open index.html

## Levanta un servidor local en puerto 3000 (necesita python3)
dev:
	@echo "→ Skill Tree corriendo en http://localhost:3000"
	@python3 -m http.server 3000 --bind 127.0.0.1

## Resetea todo el progreso (borra localStorage via script)
reset:
	@echo "→ Para resetear el progreso, abrí la consola del browser y ejecutá:"
	@echo "   localStorage.removeItem('roadmap-progress'); location.reload();"

## Ayuda
help:
	@echo ""
	@echo "  make open   → Abre el skill tree en el browser"
	@echo "  make dev    → Levanta servidor local en :3000"
	@echo "  make reset  → Instrucciones para resetear progreso"
	@echo ""
