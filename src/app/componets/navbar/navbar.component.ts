import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logout:boolean = false ;
  validateRol:boolean = false;
  islogin:boolean = false;
  constructor(private roter:Router,private authService:AuthService) { }

  ngOnInit(): void { 
    this.validateInfo();

    this.authService.notificarAction$.subscribe(() => {
      this.validateInfo();
    });
  }

  validateInfo(){
    this.logout= this.authService.isAuth();
    this.validateRol = this.authService.validateRol();
    this.islogin= this.authService.isLogin();
    //console.log(this.logout)
  }

  logOut(){
    localStorage.removeItem('token');
    this.roter.navigate(['/login'])
    this.validateInfo();
  }

}
