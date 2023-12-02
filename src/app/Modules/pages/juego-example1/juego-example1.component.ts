import { Component } from '@angular/core';
import { ServiceAuthService } from 'src/app/Core/services/service-auth.service';
const jsonData = [
  {
    DIMENSION: "Celda 1",
    ACTIVIDADES: [
      {
        ACTIVIDAD: "Fila 1",
        TIPO_DE_META: "Subcelda 1.1",
        PROGRAMACION_2023: "Subcelda 1.2",
        PROGRAMACION_MENSUAL: "Subcelda 1.3",
        TOTAL_EJECUTADO: {
          EJECUTADO: "Fila 1, Columna 3.1",
          EJECUTAR: "Fila 1, Columna 3.2",
          AVANCE: "Fila 1, Columna 3.3"
        },
        OBSERVACIONES: "Fila 1, Columna 4"
      },
      {
        ACTIVIDAD: "Fila 2",
        TIPO_DE_META: "Subcelda 1.1",
        PROGRAMACION_2023: "Subcelda 1.2",
        PROGRAMACION_MENSUAL: "Subcelda 1.3",
        TOTAL_EJECUTADO: {
          EJECUTADO: "Fila 2, Columna 3.1",
          EJECUTAR: "Fila 2, Columna 3.2",
          AVANCE: "Fila 2, Columna 3.3"
        },
        OBSERVACIONES: "Fila 2, Columna 4"
      },
      {
        ACTIVIDAD: "Fila 3",
        TIPO_DE_META: "Subcelda 1.1",
        PROGRAMACION_2023: "Subcelda 1.2",
        PROGRAMACION_MENSUAL: "Subcelda 1.3",
        TOTAL_EJECUTADO: {
          EJECUTADO: "Fila 3, Columna 3.1",
          EJECUTAR: "Fila 3, Columna 3.2",
          AVANCE: "Fila 3, Columna 3.3"
        },
        OBSERVACIONES: "Fila 3, Columna 4"
      },
    ]
  }
];
@Component({
  selector: 'app-juego-example1',
  templateUrl: './juego-example1.component.html',
  styleUrls: ['./juego-example1.component.scss']
})
export class JuegoExample1Component {
data = jsonData;

/**
 *
 */
constructor(service: ServiceAuthService) {
  service.obtenerDatos().subscribe();  
}
}
