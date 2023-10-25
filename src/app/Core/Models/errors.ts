interface ErrorItem {
    status: number;
    message: string;
  }
  
 export const errores: ErrorItem[] = [
    { status: 400, message: "La solicitud es incorrecta o malformada." },
    { status: 401, message: "No tienes autorización para acceder a este recurso." },
    { status: 403, message: "No tienes permisos para acceder a este recurso." },
    { status: 404, message: "La página que buscas no se encuentra en el servidor." },
    { status: 500, message: "Ocurrió un error interno en el servidor." },
    { status: 503, message: "El servicio no está disponible en este momento. Por favor, inténtalo más tarde." },
    { status: 504, message: "El servidor tardó demasiado tiempo en responder. Por favor, inténtalo nuevamente." }
  ];
  
  
  
  