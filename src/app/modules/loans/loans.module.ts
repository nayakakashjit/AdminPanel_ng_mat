import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { HomeLoanComponent } from './pages/home-loan/home-loan.component';
import { InstaLoanComponent } from './pages/insta-loan/insta-loan.component';
import { CreditCardComponent } from './pages/credit-card/credit-card.component';
import { PersonalLoanComponent } from './pages/personal-loan/personal-loan.component';
import { BusinessLoanComponent } from './pages/business-loan/business-loan.component';
import { MaterialModules } from '@app/material-modules/material.modules';


@NgModule({
  declarations: [
    HomeLoanComponent, 
    InstaLoanComponent, 
    CreditCardComponent, 
    PersonalLoanComponent, 
    BusinessLoanComponent
  ]
    ,
  imports: [
    CommonModule,
    LoansRoutingModule,
    MaterialModules
  ]
})
export class LoansModule { }
