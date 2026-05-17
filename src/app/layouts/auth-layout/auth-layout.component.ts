import { Component, OnInit } from '@angular/core';
import { AuthNavComponent } from '../../components/auth-nav/auth-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  imports: [AuthNavComponent, RouterOutlet],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
