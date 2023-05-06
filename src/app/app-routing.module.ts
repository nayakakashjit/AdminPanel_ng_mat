import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { moduleRoutes } from './shared/moduleRout/moduleRout';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
    
  },
  { 
    path: '',
    children: moduleRoutes
  }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
