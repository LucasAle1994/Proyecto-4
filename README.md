# 🛒 Ecommerce API – NestJS + TypeORM + PostgreSQL

API REST completa para un sistema de Ecommerce, desarrollada con **NestJS**, **TypeORM** y **PostgreSQL**, implementando autenticación JWT, manejo avanzado de roles, carga de imágenes con Cloudinary, control de pedidos, categorías, usuarios y productos.

Este proyecto fue desarrollado como parte del bootcamp **Henry Full Stack Developer**.

---

## 🚀 Características principales

- 🔐 **Autenticación JWT** (login + roles)
- 👥 **Roles:** admin, user
- 👤 Gestión de usuarios (CRUD + roles)
- 🛒 Manejo de productos (alta, edición, eliminación, stock)
- 🗂️ Categorías
- 🧾 Creación de órdenes y detalle de compras
- ☁️ **Cloudinary** para subir imágenes
- 🗄️ **PostgreSQL + TypeORM**
- 🐳 **Docker & docker-compose listos para correr el proyecto**
- 📄 Seed automático de datos básicos
- 🧩 Guards, Middlewares y DTOs con validaciones
- 🛠️ Documentación con Swagger (opcional si la habilitas)

---

## 🧱 Arquitectura del Proyecto

src/
- ├── auth/          # Login, JWT, Guards y AuthService
- ├── categories/    # CRUD categorías
- ├── config/        # Configuración de TypeORM y Cloudinary
- ├── decorators/    # Decoradores personalizados (Roles)
- ├── file-upload/   # Módulo de carga de archivos
- ├── middlewares/   # Logger de datos
- ├── interceptors/  # Validación de payloads
- ├── migration/     # Migraciones de BD
- ├── orders/        # Órdenes y detalle de órdenes
- ├── products/      # CRUD productos + stock + imágenes
- ├── seeder/        # Servicio para poblar datos
- ├── users/         # CRUD usuarios + roles
- ├── utils/         # Seeder de BD
- ├── app.module.ts
- └── main.ts

---

## 📦 **Tecnologías utilizadas**

### **Backend**
- NestJS
- TypeORM
- PostgreSQL
- JWT + bcrypt

### **Storage**
- Cloudinary (imagenes de productos)

### **Infraestructura**
- Docker / Docker Compose

### **Herramientas**
- Git / GitHub  
- ESLint / Prettier  
- Pipes / Guards  

---

## ⚙️ **Instalación y ejecución**

### 🧩 **1. Clonar el repositorio**

- git clone https://github.com//LucasAle1994/Proyecto-4.git
- cd back
- cd e-commerce-lucas-ale1994

### 📁 **2. Instalar dependencias**
- npm install

### 🔧 **3. Configurar variables de entorno**
- .env
  
- DB_NAME=e_commerce
- DB_HOST=localhost
- DB_PORT=5432
- DB_USERNAME=postgres
- DB_PASSWORD=tu_password

- PORT=3002
- HOST=localhost

- CLOUDINARY_CLOUD_NAME=********
- CLOUDINARY_API_KEY=********
- CLOUDINARY_API_SECRET=*******

- JWT_SECRET=******


### 🐳 **4. Levantar Base de datos con Docker**
- docker-compose up -d
- abre en http://localhost:3000/api

### ▶️ **5. Ejecutar la aplicación**
npm run start:dev
- abre en http://localhost:3002/api

Se cargarán:
- usuarios base
- categorías
- productos iniciales

---

### 📌 **Endpoints principales**
🔐 Auth
- POST /auth/login

### 👤 **Users**
- GET    /users
- POST   /users
- PATCH  /users/:id
- DELETE /users/:id

### 🗂️ **Categories**
- GET    /categories
- POST   /categories
- PATCH  /categories/:id
- DELETE /categories/:id

### 🛒 **Products**
GET    /products
POST   /products
PATCH  /products/:id
DELETE /products/:id

### 🧾 **Orders**
POST /orders
GET  /orders/user/:id

---
🧑‍💻 Autor

- ALe, Lucas Ezequiel
- Full Stack Developer
- 📧 Email: lucasdeveloper1994@gmail.com








