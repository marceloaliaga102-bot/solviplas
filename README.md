# 🌿 SOLVIPLAS - Plataforma de Bioplásticos Biodegradables e Hidrosolubles

> **Solución sustentable de Química Verde:** Sustituyendo el plástico convencional por biopolímeros 100% biodegradables e hidrosolubles a base de almidón vegetal.

---

## ✨ Características Principales

1. **🎨 Editor Visual en Vivo Estilo Canva:**
   - Edita cualquier texto, título, número o descripción directamente sobre la pantalla haciendo clic.
   - Reemplaza cualquier imagen por otra imagen descargada en tu equipo, pega enlaces web o cámbiala directamente por un video.
   - Sube videos descargados (MP4, WebM) o imágenes (PNG, JPG, WebP) desde tu dispositivo móvil o computadora.
   - Descarga cualquier imagen o video del sitio a tu equipo con un solo clic.

2. **🧪 Tutorial Interactivo de Elaboración (Cerca al Inicio):**
   - Guía paso a paso con control de temperatura, tiempos de gelatinización y consejos prácticos.
   - Reproductor multimedia demostrativo en laboratorio.
   - Calculadora dinámica de proporciones e ingredientes según la cantidad de láminas deseadas.
   - Completamente editable por el administrador (añadir pasos, editar textos, tips e insumos).

3. **📦 Catálogo Dinámico de Productos Solviplas:**
   - Productos reales: *Bolsas Hidrosolubles para Comercio*, *Film Protector Adhesivo para Alimentos*, *Cápsulas y Sachets Solubles Monodosis*, *Láminas Rígidas Termomoldeables*, *Cubiertas Agrícolas (Bio-Mulch)*, etc.
   - Al hacer clic en cualquier producto se abre una vista interactiva con sus **ingredientes y cantidades específicas** y sus **pasos de elaboración específicos**.
   - Simulador animado de disolución rápida en agua tibia.
   - El administrador puede agregar nuevos productos (+) o eliminar productos existentes.

4. **➕ Creación y Gestión de Nuevas Secciones:**
   - Botón "+ Nueva Sección" en el panel flotante de Canva para agregar nuevos bloques personalizados (con títulos, subtítulos, etiquetas, multimedia y puntos destacados).
   - Las nuevas secciones se integran automáticamente en la barra de navegación superior.

5. **📱 Barra de Navegación Rápida con Botones por Sección:**
   - Barra superior con botones rápidos para cada sección (`Inicio`, `Tutorial`, `Productos`, `El Proyecto`, `Problemática`, `Fórmula`, `Cronograma`, `Resultados`, `Galería`, `Equipo`, `Comunidad`, y secciones creadas).
   - En teléfonos celulares y pantallas móviles se desplaza suavemente de forma horizontal (*swipe touch*) si no alcanza el espacio en pantalla.

6. **☁️ Base de Datos en la Nube y Sincronización en Tiempo Real:**
   - Servidor full-stack con Express y almacenamiento persistente en `data/db.json`.
   - Cada cambio que realiza el administrador se guarda en la base de datos para que todos los usuarios y visitantes de cualquier dispositivo lo vean de inmediato.
   - Respaldo automático en almacenamiento local para funcionamiento offline.

7. **🔐 Cuentas de Usuario Reales y Sesión Limpia:**
   - Los visitantes pueden registrarse e iniciar sesión de verdad (sin depender de servicios externos).
   - Acceso de administrador unificado en el mismo modal de inicio de sesión general, sin delatar la existencia de un botón exclusivo para el dueño.
   - **Limpieza total al cambiar de cuenta:** al cerrar sesión, no queda ningún rastro ni dato de la cuenta anterior.

8. **✨ Animación de Puntos Brillantes:**
   - Efecto visual de partículas brillantes y estrellas flotantes al inicio de la página.

---

## 🚀 Cómo Subir Este Proyecto a GitHub

Sigue estos pasos en tu terminal para publicar el repositorio en GitHub:

### 1. Iniciar Git en la carpeta del proyecto
```bash
git init
```

### 2. Agregar todos los archivos al seguimiento
```bash
git add .
```

### 3. Crear el primer commit
```bash
git commit -m "feat: lanzamiento de Solviplas con editor Canva, productos, tutorial y base de datos"
```

### 4. Renombrar la rama principal a `main`
```bash
git branch -M main
```

### 5. Vincular con tu repositorio de GitHub
Crea un nuevo repositorio vacío en [github.com/new](https://github.com/new) y copia el enlace:
```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

### 6. Subir el código a GitHub
```bash
git push -u origin main
```

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
- Node.js versión 18 o superior.
- Gestor de paquetes npm.

### Pasos:
```bash
# 1. Clonar el repositorio (si lo descargas de GitHub)
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd solviplas

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor en desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:3000`.

---

## 🛠️ Credenciales Maestras de Administrador

Para acceder a las funciones completas de edición estilo Canva:
- **Correo / Usuario:** `marceloaliaga102@gmail.com` (o `admin`)
- **Contraseña:** `Solviplas2025!`

> Ingrésalas desde el botón regular "Ingresar" en la barra superior. El sistema te otorgará de inmediato los permisos de edición sin mostrar botones sospechosos al público.

---

## 📦 Despliegue en Producción

El proyecto está preparado para ejecutarse en plataformas como **Render**, **Railway**, **Fly.io**, **Vercel** o en contenedores **Docker**:

```bash
# Compilación de la aplicación
npm run build

# Ejecución del servidor full-stack
npm start
```
