import { ContenidoItem } from "./contenido";

export interface InformacionTema {
  idSubtema: string;
  contenido: ContenidoItem[];
}
export const informacionTemaData: InformacionTema = {
  idSubtema: 'e8a0e5a0-c564-46fe-a4ed-950b7622db53',
  contenido: [
    {
      type: 'text',
      title: 'TEXTO',
      InfoContent: 'DESCRIPCION DE UN TEXTO',
      position: 1,
      id: 101,
    },
    {
      type: 'image',
      title: 'IMAGEN',
      InfoContent:
        'https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg',
      position: 2,
      id: 102,
    },
    {
      type: 'video',
      title: 'UN VIDEO DE YOUTUBE',
      InfoContent: 'https://www.youtube.com/embed/A0oD0dl48IM?si=pJC3cp5baobdeW7_',
      position: 3,
      id: 103,
    },
  ],
};