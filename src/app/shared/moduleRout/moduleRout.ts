import { Routes } from '@angular/router';

export const moduleRoutes: Routes = [
    {
        path: 'account',
        loadChildren: () => import('../../modules/account/account.module').then(module => module.AccountModule)
    },
    { 
        path: 'home',
        loadChildren: () => import('../../modules/home/home.module').then(module => module.HomeModule)
    },
    {
        path:'loans',
        loadChildren: () => import('../../modules/loans/loans.module').then(module => module.LoansModule)
    },
    { 
        path: 'about', 
        loadChildren: () => import('../../modules/about/about.module').then(module => module.AboutModule) 
    },
    {   path: 'contact',
        loadChildren: () => import('../../modules/contact/contact.module').then(module => module.ContactModule)
    }
];