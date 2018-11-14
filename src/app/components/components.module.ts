import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@Angular/forms';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'
import { MenuComponent } from './menu/menu.component'
import { KzPaginacaoComponent } from './paginacao';
import { LowerDirective } from './directives/lowercase.directive'
import { UpperDirective } from './directives/uppercase.directive'
import { ModalUtilComponent } from './modal-util/modal-util.component';
import { ModalMessage } from './modal-util/modal-message.component'
import { MyPipe } from './pipes/upperCase.pipes';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { IkMaskDirective } from './directives/ik-mask.directive';
import { LoginComponent } from './security/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  declarations: [LoadingSpinnerComponent, MenuComponent, KzPaginacaoComponent, CheckboxGroupComponent,
                 LowerDirective, UpperDirective,ModalUtilComponent, ModalMessage, MyPipe, 
                 CheckboxGroupComponent, IkMaskDirective, LoginComponent],
  exports: [LoadingSpinnerComponent, MenuComponent, KzPaginacaoComponent, FormsModule, CheckboxGroupComponent,
            LowerDirective, UpperDirective, ModalUtilComponent, ModalMessage,MyPipe, IkMaskDirective]
})
export class ComponentsModule { }
