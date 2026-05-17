import { Component, OnInit } from '@angular/core';
import { UserNavComponent } from '../../components/user-nav/user-nav.component';
import { RouterOutlet } from '@angular/router';
import { UserFooterComponent } from '../../components/user-footer/user-footer.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
  imports: [UserNavComponent, RouterOutlet, UserFooterComponent],
})
export class UserLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
