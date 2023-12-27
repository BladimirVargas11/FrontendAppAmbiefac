 interface ErrorItem {
    status: number;
    link: string;
  }
  
 export const errores: ErrorItem[] = [
    { status: 400, link: "La solicitud es incorrecta o malformada." },
    {status : 401, link : '../../../../assets/status_code/401 Error Unauthorized-rafiki.png',},
    {status : 403, link : '../../../../assets/status_code/403 Error Forbidden-amico.png',},
    {status : 404, link : '../../../../assets/status_code/404.jpg',},
    {status : 500, link : '../../../../assets/status_code/500 Internal Server Error-cuate.png',},
    { status: 503, link: "../../../../assets/status_code/default.jpg" },
    { status: 504, link: "../../../../assets/status_code/default.jpg" }
  ];
  
  
  
  