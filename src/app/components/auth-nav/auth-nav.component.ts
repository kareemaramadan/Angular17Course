import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css'],
  imports: [MenubarModule, RouterLink, AvatarModule, RippleModule, RouterLinkActive],
})
export class AuthNavComponent implements OnInit {
  constructor() {}

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        path: 'login',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        path: 'register',
      },
    ];
  }
}
