import { Component } from '@angular/core';
import { UserInterface } from '../../interfaces/users.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  user: UserInterface | null = null;
  constructor(private router: Router) {}
}
