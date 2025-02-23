# 🛍️ FitTEX 🖼️

¡Bienvenido al proyecto **FitTEX**! Esta aplicación permite a los usuarios seleccionar una imagen y buscar productos relacionados en las marcas de ropa de Inditex. Desarrollada con **React** y **TypeScript**, es una muestra de cómo integrar funcionalidades de búsqueda y visualización de datos en una interfaz moderna.

---

## 🚀 Características principales

- **Selección de imágenes**: Los usuarios pueden cargar una imagen desde su dispositivo.
- **Búsqueda mockeada**: Simula una llamada a una API para obtener productos relacionados con la imagen seleccionada.
- **Visualización de resultados**: Muestra los productos encontrados en una lista con detalles como nombre, precio y enlace al producto.
- **Diseño responsive**: La interfaz se adapta a diferentes tamaños de pantalla.

---

## 🛠️ Tecnologías utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript**: Añade tipos estáticos a JavaScript para mejorar la calidad del código.
- **Vite**: Herramienta de construcción rápida para proyectos modernos.
- **CSS**: Estilos personalizados para una interfaz atractiva.

---

## 📦 Instalación y ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clona el repositorio

Primero, clona este repositorio en tu máquina:

```bash
git clone https://github.com/pabloboo/FitTEX
```

### 2. Navega al directorio del frontend

Accede a la carpeta `frontend`:

```bash
cd FitTEX/frontend
```

### 3. Instala las dependencias

Instala todas las dependencias necesarias usando npm:

```bash
npm install
```

### 4. Ejecuta el servidor de desarrollo

Inicia la aplicación en modo de desarrollo:

```bash
npm run dev
```

### 5. Abre la aplicación en tu navegador

Una vez que el servidor esté en funcionamiento, abre tu navegador y visita:

```
http://localhost:5173
```

¡Listo! Ahora puedes usar la aplicación y explorar sus funcionalidades.

---

## 🖼️ Cómo usar la aplicación

1. **Buscar productos por imagen similar**: Haz clic en el botón "Seleccionar imagen" para cargar una imagen desde tu dispositivo y la web te recomendará imágenes de tiendas de Inditex relacionadas con la imagen dada.
2. **Buscar productos por lenguaje natural**: Describe en lenguaje natural la prenda que quieres buscar y la web creará una consulta usando un modelo de lenguaje natural.
3. **Añadir links a la lista de deseos**: Marca el corazón de un ítem para guardarlo en la lista de deseos y se guardará en tu sesión del navegador para revisarlo más tarde.
4. **Compartir links en redes sociales**: Selecciona una de las tres redes sociales disponibles para compartir un link.

---

## 🧩 Estructura del proyecto

```
frontend/
├── public/              # Archivos públicos (imágenes, favicon, etc.)
├── src/
│   ├── assets/          # Recursos estáticos (logos, iconos, etc.)
│   ├── components/      # Componentes reutilizables
│   ├── services/        # Lógica de llamadas a APIs o mocks
│   ├── App.tsx          # Componente principal de la aplicación
│   └── main.tsx         # Punto de entrada de la aplicación
├── index.html           # Plantilla HTML principal
├── package.json         # Dependencias y scripts del proyecto
└── vite.config.ts       # Configuración de Vite
```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama con tu feature o corrección: `git checkout -b mi-feature`.
3. Realiza tus cambios y haz commit: `git commit -m "Añade mi feature"`.
4. Sube tus cambios: `git push origin mi-feature`.
5. Abre un Pull Request y describe tus cambios.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Para más detalles, consulta el archivo [LICENSE](LICENSE).

---

## 🙌 Créditos

- Desarrollado por [Mar](https://github.com/MarAlonsoGarcia), [Pablo](https://github.com/pabloboo), [Alejandro](https://github.com/jandrogarciagarcia) y[Abel](https://github.com/AbelJuncal).
- Inspirado en [API Inditex](https://developer.inditex.com/apimktplc/web/products).

---

## Demo
Búsqueda por prendas similares y compartir prenda en redes sociales:

https://github.com/user-attachments/assets/3e88fd64-6cf2-46aa-9a39-c458b3011a57

Búsqueda en lenguaje natural y añadir una prenda a la wishlist:

https://github.com/user-attachments/assets/b512f1b1-5ee9-434c-9eae-57d608a54dc1



¡Gracias por visitar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contactar con los desarrolladores. 😊
