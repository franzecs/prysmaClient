import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@Angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { RootUserRoutingModule } from './rootUser.routing';
import { RootUserComponent } from './root-user.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosCreateComponent } from './usuarios/usuarios-create/usuarios-create.component';
import { EmpresasListComponent } from './empresas/empresas-list/empresas-list.component';
import { EmpresasCreateComponent } from './empresas/empresas-create/empresas-create.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RootUserRoutingModule
  ],
  declarations: [RootUserComponent,  
    UsuariosListComponent, UsuariosCreateComponent, EmpresasListComponent, EmpresasCreateComponent],
  exports: [RootUserComponent]
})
export class RootUserModule { }
