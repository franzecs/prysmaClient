import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@Angular/forms';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'
import { UploadFileService } from './upload/upload-file.service'
import { MenuComponent } from './menu/menu.component'
import { KzPaginacaoComponent } from './paginacao';
import { LowerDirective } from './directives/lowercase.directive'
import { UpperDirective } from './directives/uppercase.directive'
import { UploadComponent } from './upload/upload.component';
import { ModalUtilComponent } from './modal-util/modal-util.component';
import { ModalMessage } from './modal-util/modal-message.component'
import { MyPipe } from './pipes/upperCase.pipes';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { IkMaskDirective } from './directives/ik-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UploadFileService],
  declarations: [LoadingSpinnerComponent, MenuComponent, KzPaginacaoComponent, CheckboxGroupComponent,
                 LowerDirective, UpperDirective, UploadComponent, ModalUtilComponent, ModalMessage,
                 MyPipe, CheckboxGroupComponent, IkMaskDirective],
  exports: [LoadingSpinnerComponent, MenuComponent, KzPaginacaoComponent, FormsModule, CheckboxGroupComponent,
            LowerDirective, UpperDirective, UploadComponent, ModalUtilComponent, ModalMessage,MyPipe, IkMaskDirective]
})
export class ComponentsModule { }
