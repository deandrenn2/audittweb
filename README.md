# Auditt Web

Sistema web de auditorías GPC (Guías de Práctica Clínica).

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Docker y Docker Compose (opcional, para despliegue con contenedores)

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd audittweb
```

2. Instalar dependencias:

```bash
cd Auditt.Web
npm install
```

3. Configurar variables de entorno:
   Crear un archivo `.env` en la carpeta `Auditt.Web` con:

```env
VITE_API_URL=<url-de-tu-api>
```

## Ejecución en Desarrollo

Desde la carpeta `Auditt.Web`:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Ejecución en Producción

### Opción 1: Build Local

```bash
cd Auditt.Web
npm run build
npm run preview
```

### Opción 2: Docker

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

La aplicación estará disponible en `http://localhost:8081`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Previsualiza el build de producción

## Estructura del Proyecto

- `Auditt.Web/src/features/` - Módulos funcionales (Clientes, Guías, Reportes, etc.)
- `Auditt.Web/src/routes/` - Configuración de rutas
- `Auditt.Web/src/shared/` - Componentes y utilidades compartidas
- `Auditt.Web/src/layout/` - Componentes de layout (Header, Sidebar, etc.)

## Tecnologías

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router
- TanStack Query
- Zustand
