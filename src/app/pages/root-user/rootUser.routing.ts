import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RootUserComponent } from './root-user.component';
import { EmpresasListComponent } from './empresas/empresas-list/empresas-list.component';
import { EmpresasCreateComponent } from './empresas/empresas-create/empresas-create.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './usuarios/usuarios-create/usuarios-create.component';

const rootUserRoutes = [
    { path:'', component: RootUserComponent,
        children:[
            { path:'empresas', component: EmpresasListComponent },
            { path:'empresas/:id/add', component: EmpresasCreateComponent },
            { path:'empresas/:id/edit', component: EmpresasCreateComponent},
            { path:'usuarios', component: UsuariosListComponent },
            { path:'usuarios/:id/add', component: UsuariosCreateComponent },
            { path:'usuarios/:id/edit', component: UsuariosCreateComponent },
        ]
    },
];

 
@NgModule({
    imports: [RouterModule.forChild(rootUserRoutes)],
    exports: [RouterModule]
})
export class RootUserRoutingModule { }