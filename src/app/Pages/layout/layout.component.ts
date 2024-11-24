import { Component } from '@angular/core';
import { UsersComponent } from "../../componentes/users/users.component";
import { RouterOutlet } from '@angular/router';
import { PerfilComponent } from '../../componentes/perfil/perfil.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
