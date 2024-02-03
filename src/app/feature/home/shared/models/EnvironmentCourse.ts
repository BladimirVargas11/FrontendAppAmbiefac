// environment-courses.ts

export interface EnvironmentCourse {
  title: string;
  description: string;
  image: string; // Agregado para la ruta de la imagen
}

export const environmentCourses: EnvironmentCourse[] = [
  {
    title: "Curso de Sostenibilidad Ambiental",
    description: "Descubre cómo llevar a cabo prácticas sostenibles para preservar el medio ambiente y promover la responsabilidad ambiental en tu vida diaria.",
    image: "../../../../assets/sostenibilidad-ambiental.png" // Ruta de la imagen
  },
  {
    title: "Gestión de Residuos y Reciclaje",
    description: "Aprende las mejores prácticas para la gestión de residuos y el reciclaje, contribuyendo así a la reducción de la huella ambiental y promoviendo un futuro más limpio.",
    image: "../../../../assets/gestion-residuos-reciclaje.png" // Ruta de la imagen
  },
  {
    title: "Conservación de la Biodiversidad",
    description: "Explora la importancia de la biodiversidad y aprende estrategias para su conservación, protegiendo así la variedad de especies en nuestro planeta.",
    image: "../../../../assets/conservacion-biodiversidad.png" // Ruta de la imagen
  }
];
