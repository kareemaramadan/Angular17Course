import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { UserDataService } from '../../core/services/UserData.service';
@Component({
  selector: 'app-user-nav',
  standalone: true,
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
  imports: [
    MenubarModule,
    AvatarModule,
    RippleModule,
    InputTextModule,
    RouterLink,
    RouterLinkActive,
    OverlayBadgeModule,
    BadgeModule,
    ButtonModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UserNavComponent implements OnInit {
  constructor(private _userData: UserDataService) {}

  username: string = '';

  items!: MenuItem[];

  ngOnInit() {
    this.getusername();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        path: '/user/home',
      },
      {
        label: 'Products',
        icon: 'pi pi-sparkles',
        path: '/user/products',
      },
      {
        label: 'Categories',
        icon: 'pi pi-th-large',
        path: '/user/categories',
      },
    ];
  }
  getusername(): void {
    this.username = this._userData.username.value;
  }
}
