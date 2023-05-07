import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLoanComponent } from './pages/home-loan/home-loan.component';
import { PersonalLoanComponent } from './pages/personal-loan/personal-loan.component';
import { BusinessLoanComponent } from './pages/business-loan/business-loan.component';
import { InstaLoanComponent } from './pages/insta-loan/insta-loan.component';
import { CreditCardComponent } from './pages/credit-card/credit-card.component';
import { AuthGuard } from '@app/core/auth/auth.guard';

const routes: Routes = [
  {
    path:'home-loan',
    component: HomeLoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'personal-loan',
    component: PersonalLoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'business-loan',
    component: BusinessLoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'insta-loan',
    component: InstaLoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'credit-card',
    component: CreditCardComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansRoutingModule { }
