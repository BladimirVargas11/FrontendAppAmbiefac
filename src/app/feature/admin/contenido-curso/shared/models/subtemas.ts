import { ContenidoItem } from "./contenido";

export interface SubTemaModel{
    id: number,
    nombreSubtema: number,
    tema: number,
    contenido: ContenidoItem[]
}

export class SubTema {
    static SubTemaDesdeObject(obj: any) {
      return new SubTema(
        obj.id || 0,
        obj.nombreSubtema || "",
        obj.tema || 0,
        obj.contenido || []
      );
    }
  
    constructor(
      public id: number,
      public nombreSubtema: string,
      public tema: number,
      public contenido: ContenidoItem[]
    ) {}
  
  }