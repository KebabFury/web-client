import { Routes } from '@angular/router';
import { BotListComponent } from './presentation/layouts/bot-list/bot-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bots'
    },
    {
        path: 'bots',
        component: BotListComponent
        // canActivate: [authGuard]
    },
];
