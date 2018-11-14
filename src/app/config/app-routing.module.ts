 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/layout/home/home.component';
import { LoginComponent } from '../components/security/login/login.component';
import { AuthGuard } from '../components/security/auth.guard';

 
const routes: Routes = [

    {   path:'', component: HomeComponent, canActivate: [AuthGuard],
        children:[
            {   
                path:'root', 
                loadChildren: '../pages/root-user/rootUser.module#RootUserModule', 
                //canActivate: [AuthGuard]
            },
        ]
    },
    {   path:'login', component: LoginComponent },
    {   path:'**', component: LoginComponent },
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }