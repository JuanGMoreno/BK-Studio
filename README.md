# BK-Studio | Portafolio para un estudio de arquitectura

Sitio web para mostrar proyectos y servicios de un estudio de arquitectura y visualización. La experiencia combina una galería de trabajos con información del estudio y contenido disponible en español e inglés.

**[Ver sitio publicado](https://bk-studio-bay.vercel.app/)** · [Ver proyecto en mi portafolio](https://mi-portafolio-bay-eta.vercel.app/es#projects)

## Vista previa

![Vista de BK-Studio](https://raw.githubusercontent.com/JuanGMoreno/Mi-Portafolio-/main/public/images/projects/KB-Studio/foto1-kbstudio.webp)

La captura se conserva en el [repositorio del portafolio](https://github.com/JuanGMoreno/Mi-Portafolio-).

## Qué permite explorar

- Página de inicio con presentación del estudio, servicios y proyectos.
- Galería de trabajos con filtros y vista ampliada de imágenes.
- Alternancia entre español e inglés mediante un contexto de React.
- Sección de contacto con enlaces de email y WhatsApp. El formulario prepara un mensaje en Gmail; **no** envía datos a un backend propio.
- Diseño adaptable a móvil y escritorio.

## Mi contribución

Colaboré sobre un proyecto existente: incorporé secciones, corregí errores y realicé el despliegue en Vercel. El repositorio no debe interpretarse como una implementación individual de todo el sitio desde cero.

## Tecnologías y estructura

React 19, TypeScript, Vite 7, Tailwind CSS 3, componentes basados en Radix UI/shadcn y Lucide React.

```text
src/App.tsx               Composición de la página
src/sections/             Hero, proyectos, servicios, contacto y pie
src/contexts/             Estado del idioma
src/lib/translations.ts   Textos en ambos idiomas
public/                  Imágenes y tipografías del sitio
```

## Ejecutar en local

```bash
git clone https://github.com/JuanGMoreno/BK-Studio.git
cd BK-Studio
npm install
npm run dev
```

Vite mostrará la URL local al iniciar (habitualmente [http://localhost:5173](http://localhost:5173)). Para comprobar el proyecto usa `npm run lint` y `npm run build`.
