# 📚 Taller 2 - Sistema de Biblioteca

## Descripción

Proyecto de backend para la gestión de una biblioteca: manejo de libros, usuarios y transacciones (préstamos/ventas). Implementado con Node.js, Express y MySQL; incluye validación con Zod.

## Estructura principal

- `Src/Router` : defines rutas base: `/libros`, `/users`, `/transaction`.
- `Src/Controller` : lógica de controladores por entidad (`Book`, `User`, `Transaction`).
- `Src/Model` : modelos de datos (representaciones JS).
- `Src/Db/Db.js` : configuración del pool de MySQL (usa variables de entorno).
- `Src/Schema` : esquemas de validación con Zod.

## Endpoints principales

Base URL: http://localhost:8080

- Libros (`/libros`)
	- `POST /libros` : Crear libro
	- `POST /libros/copy` : Generar copia de libro
	- `PATCH /libros/:id` : Actualizar precio
	- `PATCH /libros/disable/:id` : Deshabilitar copia
	- `GET /libros` : Listar libros
	- `PATCH /libros/updateStock/:id` : Actualizar stock
	- `GET /libros/recent` : Libros recientes

- Usuarios (`/users`)
	- `POST /users` : Crear usuario
	- `POST /users/register` : Registrar usuario (registro alternativo)
	- `POST /users/trabajador/registrarTrabajador` : Registrar trabajador
	- `PATCH /users/disable/:id` : Deshabilitar usuario
	- `POST /users/login` : Login
	- `GET /users` : Listar usuarios
	- `GET /users/users-workers` : Usuarios y trabajadores
	- `GET /users/loan` : Usuarios con préstamos
	- `GET /users/librains` : Listar bibliotecarias

- Transacciones (`/transaction`)
	- `POST /transaction` : Crear transacción (préstamo/venta)
	- `GET /transaction/details` : Detalle de transacciones
	- `GET /transaction/comedia` : Reporte para categoría Comedia
	- `GET /transaction/ventas` : Ventas en el año

## Requisitos

- Node.js 18+ (recomendado)
- MySQL accesible

## Variables de entorno

Crear un archivo `.env` en la raíz con al menos las siguientes variables:

```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_basedatos
```

Nota: `Src/Db/Db.js` lee estas variables para configurar el pool de conexiones.

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Crear `.env` con la configuración de la base de datos (ver sección anterior).

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

El servidor arranca en `http://localhost:8080` y CORS está configurado para `http://localhost:5173` (frontend).

