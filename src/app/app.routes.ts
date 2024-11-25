import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { UsersComponent } from './componentes/users/users.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { GamesListComponent } from './componentes/games-list/games-list.component';
export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: LayoutComponent,
        children: [ // Define las subrutas aquí
            { path: '', redirectTo: 'perfil', pathMatch: 'full'  },
            { path: 'perfil', component: PerfilComponent },
            { path: 'users', component: UsersComponent },
            { path: 'games', component: GamesListComponent }
        ]
    }
];