import { Provider } from '@angular/core';
import { BotApi } from '@application/apis/bot.api';
import { BotApiImpl } from './apis/bot.api';
import { AuthApi } from '@application/apis/auth.api';
import { AuthApiImpl } from './apis/auth.api';

export const provideInfrastructure: () => readonly Provider[] = () => [
  { provide: BotApi, useClass: BotApiImpl },
  { provide: AuthApi, useClass: AuthApiImpl },
];
