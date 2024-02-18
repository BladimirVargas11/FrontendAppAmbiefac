// environment-courses.ts

export interface EnvironmentCourse {
  title: string;
  description: string;
  image: string; // Agregado para la ruta de la imagen
}

export const environmentCourses: EnvironmentCourse[] = [
  {
    title: "Uso racional de Recursos (Uso del Agua y Uso de la Energía)",
    description: "Concientización y control son clave en unidades militares para promover uso racional de agua y energía. Campañas educativas y seguimiento de consumo son necesarios para lograrlo.",
    image: "../../../../assets/conservacion-biodiversidad.png" // Ruta de la imagen
  },
  {
    title: "Manejo integral de los Residuos Sólidos Residuos Convencionales Y Residuos Peligrosos",
    description: "Elaboración de un Plan de Gestión Integral de Residuos Sólidos para reducir generación y mitigar impactos negativos, promoviendo correcta separación y disposición final en la Fuerza Aérea Colombiana.",
    image: "../../../../assets/conservacion-biodiversidad.png" // Ruta de la imagen
  },
  {
    title: "Calentamiento global",
    description: "El cambio climático, vinculado al crecimiento industrial y consumismo, afecta el clima, suelos y supervivencia de especies. Genera residuos, explota recursos y aumenta gases de efecto invernadero.",
    image: "../../../../assets/conservacion-biodiversidad.png" // Ruta de la imagen
  },
  {
    title: "Tráfico ilegal de especies de flora y fauna",
    description: "El tráfico ilegal de especies de flora y fauna amenaza la biodiversidad global, impulsado por lucro y demanda insostenible, causando graves daños ecológicos y socioeconómicos.",
    image: "../../../../assets/conservacion-biodiversidad.png" // Ruta de la imagen
  }
];
