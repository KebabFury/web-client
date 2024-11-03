import { Routes } from '@angular/router';
import { authGuard } from './presentation/layouts/auth/guards/auth/auth.guard';
import { nonAuthGuard } from './presentation/layouts/auth/guards/non-auth/non-auth.guard';
import { SignInComponent } from './presentation/layouts/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@presentation/layouts/auth/sign-up/sign-up.component';
import { ProviderListComponent } from '@presentation/layouts/provider-list/provider-list.component';
import { ProviderAddingComponent } from '@presentation/layouts/provider-adding/provider-adding.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'providers'
    },
    {
        path: 'providers',
        component: ProviderListComponent,
        // canActivate: [authGuard]
    },
    {
        path: 'provider-adding',
        component: ProviderAddingComponent,
        // canActivate: [authGuard]
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        // canActivate: [nonAuthGuard]
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        // canActivate: [nonAuthGuard]
    },
    {
        path: '**',
        redirectTo: 'providers'
    },
];
