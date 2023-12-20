import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';


import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private notificarAction = new BehaviorSubject<boolean>(false);

  notificarAction$ = this.notificarAction.asObservable();



  rolUser:string =environment.rolad;
  private URL ='http://localhost:3000'
  constructor( private http:HttpClient, private jwtHelper:JwtHelperService) { }

  singin(user:User){
    return this.http.post(`${this.URL}/user/singin`,user)
  }

  isAuth():boolean{
    const token = localStorage.getItem('token')
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

  isLogin():boolean{
    const token = localStorage.getItem('token')
    if(!this.jwtHelper.isTokenExpired(token) && localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  validateRol():boolean{
    const token = localStorage.getItem('token')
    if(token){
      const decoded: any = jwtDecode(token);
      const roleId = decoded.roleId;
      if(roleId == this.rolUser){
        return true;
      }
    }
    return false
  }



  notificarLogueo() {
    this.notificarAction.next(true);
  }

}
