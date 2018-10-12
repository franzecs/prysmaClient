import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  providers: [],
  declarations: [TopoComponent,RodapeComponent,HomeComponent],
  exports: [TopoComponent,RodapeComponent,HomeComponent]
})
export class LayoutModule { }
