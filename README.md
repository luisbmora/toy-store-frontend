# Toy Store Frontend

Frontend desarrollado para la prueba técnica de inventario de juguetes.  
La aplicación permite consultar, crear, editar, eliminar, buscar y filtrar productos consumiendo la API de Toy Store.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Lucide React
- Vitest
- Testing Library

## Funcionalidades principales

- Listado de productos en cuadrícula.
- Alta de productos mediante formulario en modal.
- Edición de productos mediante formulario en modal.
- Eliminación de productos con modal de confirmación.
- Carga de imagen para productos.
- Vista previa de imagen seleccionada.
- Visualización de imagen actual al editar.
- Buscador por nombre de producto.
- Filtros de ordenamiento:
  - Nombre A-Z
  - Nombre Z-A
  - Precio menor a mayor
  - Precio mayor a menor
- Notificaciones de actividad en la campana:
  - Producto creado
  - Producto actualizado
  - Producto eliminado
- Alertas flotantes tipo toast para operaciones exitosas o errores.
- Diseño responsive para desktop, tablet y móvil.
- Pruebas unitarias del frontend.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js
- npm
- Backend Toy Store API ejecutándose localmente

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/luisbmora/toy-store-frontend.git
```

Entrar al proyecto:

```bash
cd toy-store-frontend
```

Instalar dependencias:

```bash
npm install
```

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto con la URL del backend:

```env
VITE_API_BASE_URL=http://localhost:7000
```

> Nota: el puerto puede cambiar dependiendo de cómo se ejecute la API.  
> Verifica la URL mostrada por el backend al ejecutar `dotnet run`.

## Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## Ejecutar pruebas unitarias

```bash
npm run test:run
```

## Ejecutar pruebas en modo watch

```bash
npm run test
```

## Compilar para producción

```bash
npm run build
```

## Vista previa del build

```bash
npm run preview
```

## Estructura del proyecto

```text
src
├── api
│   ├── httpClient.ts
│   └── productApi.ts
│
├── components
│   ├── layout
│   │   ├── AppLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── products
│   │   ├── DeleteProductModal.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductStats.tsx
│   │
│   └── ui
│       ├── Button.tsx
│       ├── FormField.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── Textarea.tsx
│       └── Toast.tsx
│
├── pages
│   └── InventoryPage.tsx
│
├── test
│   └── setup.ts
│
├── types
│   └── product.ts
│
├── utils
│   ├── productValidation.ts
│   └── theme.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

## Pruebas incluidas

El proyecto incluye pruebas para:

- Validación del formulario de productos.
- Estado vacío del grid de productos.
- Renderizado de información de productos.
- Acciones de editar y eliminar desde las tarjetas.

## Endpoints consumidos

La aplicación consume los siguientes endpoints del backend:

```text
GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
POST   /api/products/{id}/image
```

## Notas técnicas

- El frontend consume la API mediante Axios.
- La URL base se configura mediante `VITE_API_BASE_URL`.
- El backend debe tener CORS habilitado para `http://localhost:7000`.
- Las imágenes se muestran usando la URL base del backend más el `imageUrl` del producto.
- El diseño fue construido con Tailwind CSS.
- Las pruebas unitarias usan Vitest y Testing Library.

## Autor

Luis Salvador Barajas Mora
