# 🌱 EcoMarket - Tienda de Productos Ecológicos

EcoMarket es una tienda online enfocada en la venta de productos ecológicos y sustentables. La idea es ofrecer una página donde los usuarios puedan revisar productos, conocer sus características y realizar compras de manera sencilla.

El proyecto está desarrollado con **React, JavaScript, HTML, CSS y Bootstrap**, utilizando componentes para organizar las diferentes partes de la página.

## 🛒 Funcionalidades

- Página de inicio con productos destacados.
- Catálogo de productos con buscador, categorías y ofertas.
- Vista con información y detalles de cada producto.
- Carrito de compras para agregar, quitar y modificar cantidades.
- Cálculo automático de precios, descuentos y total de compra.
- Cupón de descuento `ECO10`.
- Registro e inicio de sesión de usuarios.
- Validaciones de formularios, incluyendo RUN y correo electrónico.
- Simulación del proceso de compra.
- Página de contacto, nosotros y blog.

## ⚙️ Panel de administración

EcoMarket también cuenta con un panel administrativo que permite:

- Agregar, editar y eliminar productos.
- Administrar usuarios.
- Gestionar categorías.
- Consultar pedidos registrados.
- Visualizar reportes e información de la tienda.

El acceso al panel está controlado según el rol del usuario.

## 💻 Tecnologías utilizadas

- **React:** componentes, estados y manejo de eventos.
- **JavaScript:** funcionalidades y lógica de la tienda.
- **HTML y CSS:** estructura y diseño.
- **Bootstrap:** estilos y diseño adaptable a diferentes pantallas.
- **Vite:** ejecución y compilación del proyecto.
- **React Router:** navegación entre páginas.
- **LocalStorage:** almacenamiento local de productos, usuarios, carrito y pedidos.
- **Jasmine y Karma:** pruebas unitarias.

## 🚀 Cómo ejecutar el proyecto

Para ejecutar EcoMarket es necesario tener instalado **Node.js**.

**1.** Descargar o clonar el repositorio.

**2.** Abrir la carpeta del proyecto en Visual Studio Code.

**3.** Instalar las dependencias desde la terminal:

`npm install`

**4.** Iniciar el proyecto:

`npm run dev`

**5.** Abrir en el navegador la dirección que muestra Vite, normalmente:

`http://localhost:5173`

## 📁 Organización del proyecto

- `src/components/` — Componentes reutilizables.
- `src/pages/` — Páginas de la tienda.
- `src/pages/admin/` — Panel de administración.
- `src/context/` — Manejo de estados y datos compartidos.
- `src/data/` — Datos y operaciones de productos.
- `src/utils/` — Funciones y validaciones.
- `src/styles/` — Archivos CSS.
- `public/images/` — Imágenes de los productos.
- `tests/` — Pruebas unitarias.

## 🧪 Pruebas

El proyecto cuenta con **10 pruebas unitarias** realizadas con Jasmine y Karma.

Para ejecutarlas:

`npm test`

Para comprobar la compilación del proyecto:

`npm run build`

## 📌 Información adicional

EcoMarket utiliza `localStorage` para guardar información en el navegador, por lo que no necesita una base de datos externa para funcionar.

El proceso de compra es simulado y no realiza pagos reales.

El objetivo es contar con una tienda web funcional, organizada mediante componentes React y con un diseño adaptable a computadores, tablets y celulares.