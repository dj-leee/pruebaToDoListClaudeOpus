# 📋 TaskFlow - Gestor de Tareas Premium

> Una aplicación moderna de lista de tareas creada con **Claude Opus 4.5** | Vanilla JavaScript

![Versión](https://img.shields.io/badge/versión-1.0.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-yellow)

## ✨ Características

- ✅ **Gestión completa de tareas** - Crear, editar, completar y eliminar tareas
- 🎯 **Sistema de prioridades** - Baja, media y alta prioridad con indicadores visuales
- 🔍 **Búsqueda inteligente** - Busca tareas en tiempo real
- 📊 **Estadísticas en vivo** - Seguimiento de tareas totales, completadas y pendientes
- 📈 **Barra de progreso** - Visualiza tu avance de forma atractiva
- 🌓 **Modo oscuro/claro** - Cambia entre temas automáticamente
- 💾 **Persistencia local** - LocalStorage para guardar tus datos
- 📱 **Diseño responsivo** - Funciona perfectamente en desktop y móvil
- ⌨️ **Atajos de teclado** - Presiona "/" para buscar

## 🚀 Demostración en vivo

Abre `index.html` en tu navegador para empezar a usar TaskFlow.

## 📁 Estructura del proyecto

```
pruebaClaude/
├── index.html          # Estructura HTML
├── style.css           # Estilos y temas
├── app.js              # Lógica de la aplicación
└── README.md           # Este archivo
```

## 🛠️ Tecnologías utilizadas

| Tecnología | Descripción |
|-----------|------------|
| **HTML5** | Estructura semántica |
| **CSS3** | Diseño moderno con variables CSS |
| **JavaScript vanilla** | Sin dependencias externas |
| **FontAwesome** | Iconografía |
| **LocalStorage API** | Persistencia de datos |

## 📖 Guía de uso

### Crear una tarea
1. Escribe tu tarea en el campo de entrada
2. Selecciona la prioridad (baja, media o alta)
3. Haz clic en "Añadir" o presiona Enter

### Filtrar tareas
- **Todas** - Muestra todas las tareas
- **Pendientes** - Solo tareas sin completar
- **Completadas** - Solo tareas finalizadas

### Buscar tareas
- Usa el campo de búsqueda para filtrar por texto
- Presiona "/" para acceder rápidamente a la búsqueda

### Gestionar tareas
- ✓ Haz clic en el checkbox para marcar como completada
- ✏️ Haz clic en el icono de edición para modificar
- 🗑️ Haz clic en el icono de eliminar para borrar

### Acciones en lote
- **Completar todas** - Marca todas las tareas como completadas
- **Limpiar completadas** - Elimina todas las tareas finalizadas

## 🎨 Temas

TaskFlow incluye dos temas beautifully diseñados:

- **Tema claro** - Ideal para el día
- **Tema oscuro** - Perfecto para la noche

Cambia entre temas usando el botón en la esquina superior derecha.

## 💾 Almacenamiento

Todas tus tareas se guardan automáticamente en `localStorage` del navegador:
- Clave: `taskflow_tasks`
- Clave del tema: `taskflow_theme`

## 🏗️ Arquitectura

La aplicación está organizada en módulos:

```javascript
State        // Gestión de estado
Storage      // Persistencia de datos
Utils        // Utilidades
DOM          // Referencias al DOM
UI           // Renderizado
Handlers     // Manejadores de eventos
```

## 🎯 Puntos destacados

### Diseño responsivo
```css
- Desktop: Diseño de columna única optimizado
- Tablet: Grid adaptativo
- Móvil: Interfaz touch-friendly
```

### Animaciones suaves
- Entrada/salida de tareas
- Transiciones de tema
- Efectos hover
- Animación del corazón en el footer

### Experiencia de usuario
- Validación de entrada
- Confirmación antes de acciones destructivas
- Notificaciones tipo toast
- Indicadores visuales de prioridad

## 🔐 Datos y privacidad

- ✅ Todos los datos se almacenan localmente en tu navegador
- ✅ Sin conexión a servidor
- ✅ Sin seguimiento
- ✅ Privacidad 100% garantizada

## 🎓 Créditos

Desarrollado completamente con **Claude Opus 4.5** - Un modelo de IA avanzado de Anthropic.

Este proyecto demuestra las capacidades de Claude para:
- Arquitectura de aplicaciones
- Diseño UI/UX
- Gestión de estado
- Optimización de rendimiento

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo, modificarlo y distribuirlo.

## 🌟 Características futuras

- [ ] Categorías de tareas
- [ ] Recordatorios y notificaciones
- [ ] Exportar tareas a PDF
- [ ] Sincronización en la nube
- [ ] Modo colaborativo
- [ ] Integración con calendario

## 🐛 Problemas conocidos

Actualmente, no hay problemas conocidos. Si encuentras alguno, siéntete libre de reportarlo.

## 💬 Feedback

Tu feedback es muy valioso. ¡Cuéntame qué te parece!

---

**Hecho con ❤️ usando Claude Opus 4.5**

*Última actualización: 28 de noviembre de 2025*
