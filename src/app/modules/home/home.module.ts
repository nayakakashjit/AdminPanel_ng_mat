import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModules } from '@app/material-modules/material.modules';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModules
  ]
})
export class HomeModule { }
