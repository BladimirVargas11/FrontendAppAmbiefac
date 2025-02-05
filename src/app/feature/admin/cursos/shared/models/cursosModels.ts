import { SubTemaModel } from "../../../contenido-curso/shared/models/subtemas";

export interface CursoForm {
  id:number,
  nombreCurso: string;
  imagen: string;
  tiempo: string;
  descripcion: string;
  Subtemas: SubTemaModel[]
}

export class Curso {
  static CursoDesdeObject(obj: any) {
    return new Curso(
      obj.id || 0, // Use 0 if id is null
      obj.nombreCurso || "",
      obj.imagen || "",
      obj.tiempo || "",
      obj.descripcion || "",
      [] 
    );
  }

  constructor(
    // public usuarioCrea: string,
    public id: number,
    public nombreCurso: string,
    public imagen: string,
    public tiempo: string,
    public descripcion: string,
    public Subtemas: SubTemaModel[]
  ) {
    // Implementation of the constructor
  }
}
export const cursos: any[] = [
  {
    nombre: 'Gestión Sostenible de Residuos',
    descripcion: 'Aprende las mejores prácticas para la gestión sostenible de residuos y contribuye al cuidado del medio ambiente.',
    tiempo: '4 hr',
    contenido: 1,
  },
  {
    nombre: 'Conservación de la Biodiversidad',
    descripcion: 'Explora estrategias efectivas para la conservación de la biodiversidad y la protección de especies en peligro de extinción.',
    tiempo: '6 hr',
    contenido: 2,
  },
  {
    nombre: 'Eficiencia Energética en Edificaciones',
    descripcion: 'Descubre cómo mejorar la eficiencia energética en edificaciones para reducir la huella de carbono y promover la sostenibilidad.',
    tiempo: '5 hr',
    contenido: 3,
  },
  {
    nombre: 'Gestión del Agua y Saneamiento Ambiental',
    descripcion: 'Aprende sobre la gestión responsable del agua y las prácticas de saneamiento ambiental para preservar nuestros recursos hídricos.',
    tiempo: '8 hr',
    contenido: 4,

  },
  {
    nombre: 'Cambio Climático: Impactos y Adaptación',
    descripcion: 'Comprende los impactos del cambio climático y explora estrategias de adaptación para mitigar sus efectos negativos.',
    tiempo: '7 hr',
    contenido: 5,

  },
  {
    nombre: 'Gestión Sostenible de Residuos',
    descripcion: 'Aprende las mejores prácticas para la gestión sostenible de residuos y contribuye al cuidado del medio ambiente.',
    tiempo: '4 hr',
    contenido: 6,
  },
  {
    nombre: 'Conservación de la Biodiversidad',
    descripcion: 'Explora estrategias efectivas para la conservación de la biodiversidad y la protección de especies en peligro de extinción.',
    tiempo: '6 hr',
    contenido: 7,
  },
  {
    nombre: 'Eficiencia Energética en Edificaciones',
    descripcion: 'Descubre cómo mejorar la eficiencia energética en edificaciones para reducir la huella de carbono y promover la sostenibilidad.',
    tiempo: '5 hr',
    contenido: 8,
  },
  {
    nombre: 'Gestión del Agua y Saneamiento Ambiental',
    descripcion: 'Aprende sobre la gestión responsable del agua y las prácticas de saneamiento ambiental para preservar nuestros recursos hídricos.',
    tiempo: '8 hr',
    contenido: 9,

  },
  {
    nombre: 'Cambio Climático: Impactos y Adaptación',
    descripcion: 'Comprende los impactos del cambio climático y explora estrategias de adaptación para mitigar sus efectos negativos.',
    tiempo: '7 hr',
    contenido: 10,

  }
];