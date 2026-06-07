# 📚 Librería Doulos — API REST

> **Taller Nº 2** · Node.js + MySQL 8.0 · Universidad Católica del Norte  
> Bases de Datos — Departamento de Ingeniería de Sistemas y Computación · I-2026

---

## 🎯 Objetivos

| # | Objetivo |
|---|----------|
| 1 | Diseño e implementación de sistemas de información con bases de datos relacionales |
| 2 | Desarrollo de API RESTful con Node.js, MySQL y arquitectura MVC |
| 3 | Integración Frontend-Backend mediante endpoints definidos |

---

## 🚀 Inicio Rápido

### Requisitos previos
- Node.js v18+
- MySQL 8.0
- npm

### Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd taller2

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Iniciar en desarrollo
npm run dev
```

El servidor arranca en **`http://localhost:8080`** 🟢

---

## ⚙️ Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
JWT_SECRET=una_clave_secreta
```

---

## 🗂️ Estructura del Proyecto

```
Src/
├── App.js                  # Punto de entrada
├── Router/
│   ├── Book.router.js      # Rutas de libros
│   └── User.router.js      # Rutas de usuarios
├── Controller/
│   ├── Book/
│   └── User/
├── Model/
│   ├── Book/
│   ├── User/
│   └── Transaction/
└── Db/
    └── Db.js               # Conexión a la base de datos
```

---

## 📡 Endpoints de la API

### 📖 Libros — `/libros`

| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| `POST` | `/libros` | Registrar nuevo libro | ✅ Implementado |
| `POST` | `/libros/copy` | Generar copia de libro | ✅ Implementado |
| `PATCH` | `/libros/:id` | Actualizar precio | ✅ Implementado |
| `PATCH` | `/libros/disable/:id` | Deshabilitar copia | ✅ Implementado |
| `GET` | `/libros` | Listar todos los libros | ✅ Implementado |

### 👥 Usuarios — `/users`

| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| `POST` | `/users` | Agregar usuario (admin) | ✅ Implementado |
| `POST` | `/users/register` | Registro self-service | ✅ Implementado |
| `POST` | `/users/trabajador/registrarTrabajador` | Registrar trabajadora | ✅ Implementado |
| `PATCH` | `/users/disable/:id` | Desactivar usuario | ✅ Implementado |
| `POST` | `/users/login` | Login / autenticación | ✅ Implementado |
| `GET` | `/users` | Listar usuarios | ✅ Implementado |

### 💳 Transacciones — `/transaction`

| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| `POST` | `/transaction` | Registrar venta o préstamo | ✅ Implementado |
| `GET` | `/transaction/details` | Consultar detalles por fecha/usuario | ✅ Implementado |

### 🔜 Pendientes

| Descripción | Estado |
|-------------|--------|
| Listar usuarios con al menos un préstamo/venta | 🔄 Pendiente |
| Listar libros con transacciones recientes (semana) | 🔄 Pendiente |
| Cantidad de libros vendidos en el año actual | 🔄 Pendiente |
| Top 10 libros más vendidos por género y semestre | 🔄 Pendiente |
| 10 libros menos prestados por categoría y semestre | 🔄 Pendiente |

---

## 🗄️ Modelo de Base de Datos

```
books              book_copies
─────────          ───────────
id (PK)     ──┐   id (PK)
nombre         └─> book_id (FK)
autor              codigo_barra
fecha_recepcion    estado
genero
edad_sugerida      users
editorial          ─────
precio             id (PK)
estado             nombre
                   edad
workers            rut
───────            direccion
id (PK)            estado
nombre
rut             transactions
correo          ────────────
password_hash   id (PK)
rol             user_id (FK)
sueldo          worker_id (FK)
bono            tipo [venta|prestamo]
estado          fecha
                semestre
                total_con_iva
                iva
```

---

## 💼 Reglas de Negocio

### Restricciones
- ❌ No se pueden vender/prestar libros a usuarios que no cumplan la **edad sugerida**
- 💰 Las ventas incluyen **IVA del 19%**

### Cálculo de Bonos

**Por venta:**
```
bono = PrecioLibro × 0.3 + (500 si día hábil | 650 si fin de semana)
```

**Por préstamo:**
```
bono = PrecioLibro × 0.1 + (100 si día hábil | 250 si fin de semana)
```

---

## 📦 Entregables

- [x] Código fuente backend (Node.js)
- [ ] Base de datos exportada (`.sql`) con datos de prueba
- [ ] Modelo ER (Visual Paradigm o imagen)
- [ ] Colección Postman / Insomnia
- [x] README con instrucciones

### Datos mínimos requeridos
- 📚 20 libros
- 👷 5 trabajadoras
- 👤 30 usuarios
- 💳 40 transacciones

---

## 🛠️ Tecnologías

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

> Universidad Católica del Norte · Bases de Datos I-2026