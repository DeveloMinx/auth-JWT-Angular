import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

import { jwtDecode } from 'jwt-decode';
 
@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(
    private authService:AuthService, 
    private router:Router
    ){}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const roleId = decoded.roleId;
  
        //console.log('roleId:', roleId);
  
       if(!this.authService.isAuth() || roleId !== expectedRole){
        console.error('Usuario No autorizado');
        this.router.navigate(['/login'])
        return false;
       }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    } else {
      console.error('No se encontró un token en el almacenamiento local.');
      return false;
    }
    return true;
  }
  
}
