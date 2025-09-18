import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { hasPermissions } from "../guards/auth.guard";

export const employeePermissionsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    hasPermissions(['ListEmployees']), // Si on n'a pas ces permissions et qu'on n'est pas loggué alors on ne pourra pas faire d'appel http
  );
};