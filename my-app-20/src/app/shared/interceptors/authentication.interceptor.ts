import { HttpHandlerFn, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../../services/auth';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(Auth);
  const token = authService.getAuthenticationToken();
  console.log(`Ajout du header : 'Authorization: \`Bearer ${token}\`'`)
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(newReq);
};
