import { CanActivateFn } from '@angular/router';
import { rolesMapping } from '../Models/roles-mapping';

export const authenticationGuard: CanActivateFn = (route, state) => {
  debugger
  const moduleName = route.routeConfig?.path; // Obtén el nombre del módulo de la ruta
  return hasPermissionToLoadModule(moduleName);
};

export const hasPermissionToLoadModule = (moduleName:any):boolean => {
  let userIsAuth = {isAuthenticated: true, userRoles: ['Client']}; //localStorage.auth
  // Verificar si el usuario tiene el rol necesario para cargar el módulo
  return userIsAuth?.isAuthenticated  && userIsAuth?.userRoles.some(role => rolesMapping[role]?.includes(moduleName));
}
