// navigation-history.service.ts

import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationHistoryService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.snapshot.url;
        if (!this.history.includes(currentRoute)) {
          this.history.push(currentRoute);
        }
      }
    });
  }

  navigateBack(): void {
    // Elimina la ruta actual del historial
    this.history.pop();
    // Navega hacia atrás a la ruta anterior
    const previousRoute = this.history.pop();
    if (previousRoute) {
      this.router.navigateByUrl(previousRoute);
    } else {
      // Si no hay una ruta anterior, navega a una ruta predeterminada o maneja según sea necesario
      this.router.navigate(['/']);
    }
  }
}
