import { Routes } from '@angular/router';
import { BotListComponent } from './presentation/layouts/bot-list.component.ts/bot-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    },
    {
        path: 'bots',
        component: BotListComponent
        // canActivate: [authGuard]
    },
];
