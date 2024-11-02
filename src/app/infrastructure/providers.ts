import { Provider } from '@angular/core';
import { AuthApi } from '@application/apis/auth.api';
import { BotApi } from '@application/apis/bot.api';
import { AuthState } from '@application/states/auth.state';
import { AuthApiImpl } from './apis/auth.api';
import { BotApiImpl } from './apis/bot.api';
import { AuthStateImpl } from './states/auth.state';

export const provideInfrastructure: () => readonly Provider[] = () => [
  { provide: BotApi, useClass: BotApiImpl },
  { provide: AuthApi, useClass: AuthApiImpl },
  { provide: AuthState, useClass: AuthStateImpl },
];
