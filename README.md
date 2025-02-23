# FitTEX

¿Buscas la prenda perfecta sin perder tiempo navegando entre miles de opciones? FitTEX es la solución. Nuestra plataforma usa inteligencia artificial para revolucionar la forma en que buscas ropa en Inditex: sube una imagen y encuentra prendas similares en segundos, o describe lo que quieres con lenguaje natural y deja que nuestro modelo haga el trabajo por ti. Guarda tus favoritos, compártelos en redes y encuentra justo lo que necesitas con precisión y rapidez. FitTEX: la manera más inteligente de descubrir tu próximo outfit.

---

## 🚀 Características principales

1. **Buscar productos por imagen similar**: Haz clic en el botón "Seleccionar imagen" para cargar una imagen desde tu dispositivo y la web te recomendará imágenes de tiendas de Inditex relacionadas con la imagen dada.
2. **Buscar productos por lenguaje natural**: Describe en lenguaje natural la prenda que quieres buscar y la web creará una consulta usando un modelo de lenguaje natural.
3. **Añadir links a la lista de deseos**: Marca el corazón de un ítem para guardarlo en la lista de deseos y se guardará en tu sesión del navegador para revisarlo más tarde.
4. **Compartir links en redes sociales**: Selecciona una de las tres redes sociales disponibles para compartir un link.

En el último apartado de este documento puedes ver estas funcionalidades en acción a través de una demo.

---

## 🛠️ Tecnologías utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript**: Añade tipos estáticos a JavaScript para mejorar la calidad del código.
- **Vite**: Herramienta de construcción rápida para proyectos modernos.
- **CSS**: Estilos personalizados para una interfaz atractiva.
- **Python** y **FastApi**: Para construir el controlador que conecta la web con el modelo de lenguaje natural.
- **Express**: Para construir el controlador que conecta la web con la API de Inditex.

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
npm install node-fetch
npm install multer
npm install axios
```

Ejecuta 

### 4. Ejecuta el servidor de desarrollo

Inicia la aplicación en modo de desarrollo:

```bash
npm run dev
```

Ejecuta también el controlador para realizar peticiones a la API de Inditex:
```bash
cd services/
node api.js
```

### 5. Abre la aplicación en tu navegador

Una vez que el servidor esté en funcionamiento, abre tu navegador y visita:

```
http://localhost:5173
```

### 6. Ejecutar el modelo de lenguaje natural

La funcionalidad de búsqueda por texto de la web usa un modelo de lenguaje natural para procesar las queries, si quieres hacer uso de esta funcionalidad aquí tienes unas indicaciones sobre cómo ejecutarla en tu máquina:
- Para el uso del modelo se crea un container sobre la imagen de Docker disponible. Dentro de este se ejecuta 'ollama server'.
- Después hay que entrar en la instancia de Docker y ejecutar 'ollama create fittex /opt/project/weights/Modelfile'.
- Por último ya se pueden hacer peticiones usando 'curl', puedes encontrar varios ejemplos de llamadas en el fichero data/queries de la rama sync.

### 7. Ejecutar el controlador del modelo

Por último, solamente falta conectar la web con el modelo de lenguaje natural. Esto se hará a través de Python, utilizando FastAPI. El controlador se encuentra en el directorio backend/main.py. En este directorio debes crear un entorno virtual instalando todas las dependencias usadas en ese fichero y ejecutar el siguiente comando:

```
uvicorn main:app --reload
```

¡Listo! Ahora puedes usar la aplicación y explorar sus funcionalidades.

---

## Arquitectura de la aplicación

El usuario interactúa directamente con la web y, para ofrecer la funcionalidad necesaria, la web se comunica con:
- El controlador del API de Inditex para consultar las tres APIs disponibles (buscar productos por imagen similar, buscar productos por texto y marca y buscar pedidos por identificador).
- El controlador del modelo de lenguaje natural para obtener el prompt introducido por el usuario y transformarlo en una petición que pueda procesar la API de buscar productos por texto y marca de Inditex.

---

## 🧩 Estructura del proyecto

```
frontend/
├── public/              # Archivos públicos (imágenes, favicon, etc.)
├── src/
│   ├── assets/          # Recursos estáticos (logos, iconos, etc.)
│   ├── components/      # Componentes reutilizables
│   ├── services/        # Lógica de llamadas a APIs y mocks
│   ├── controllers      # Funcionalidades para la aplicación web
│   └── App.tsx          # Componente principal de la aplicación
├── index.html           # Plantilla HTML principal
├── package.json         # Dependencias y scripts del proyecto
└── vite.config.ts       # Configuración de Vite
backend/              # Modelo de lenguaje natural y controlador para la conexión de la web con el mismo
devops/                # Ficheros para facilitar el arranque del modelo de lenguaje natural

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

- Desarrollado por [Mar](https://github.com/MarAlonsoGarcia), [Pablo](https://github.com/pabloboo), [Alejandro](https://github.com/jandrogarciagarcia) y [Abel](https://github.com/AbelJuncal).
- Inspirado en [API Inditex](https://developer.inditex.com/apimktplc/web/products).

---

## Demos
### Búsqueda por prendas similares y compartir prenda en redes sociales:

https://github.com/user-attachments/assets/3e88fd64-6cf2-46aa-9a39-c458b3011a57

### Búsqueda en lenguaje natural y añadir una prenda a la wishlist:

https://github.com/user-attachments/assets/b512f1b1-5ee9-434c-9eae-57d608a54dc1



¡Gracias por visitar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contactar con los desarrolladores. 😊
