import { Component } from '@angular/core';
import { UsersComponent } from "../../componentes/users/users.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
