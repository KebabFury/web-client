import { Routes } from '@angular/router';
import { BotListComponent } from './presentation/layouts/bot-list/bot-list.component';
import { SignUpComponent } from './presentation/layouts/auth/sign-up.component';
import { authGuard } from './presentation/layouts/auth/guards/auth/auth.guard';
import { nonAuthGuard } from './presentation/layouts/auth/guards/non-auth/non-auth.guard';
import { SignInComponent } from './presentation/layouts/auth/sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bots'
    },
    {
        path: 'bots',
        component: BotListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [nonAuthGuard]
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [nonAuthGuard]
    },
    {
        path: '**',
        redirectTo: 'bots'
    },
];
