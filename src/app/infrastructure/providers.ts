import { Provider } from '@angular/core';
import { AuthApi } from '@application/apis/auth.api';
import { BotApi } from '@application/apis/bot.api';
import { ProviderApi } from '@application/apis/provider.api';
import { AuthState } from '@application/states/auth.state';
import { AuthApiMock } from './apis/auth-mock.api';
import { AuthApiImpl } from './apis/auth.api';
import { BotApiImpl } from './apis/bot.api';
import { ProviderApiMock } from './apis/provider-mock.api';
import { ProviderApiImpl } from './apis/provider.api';
import { AuthStateImpl } from './states/auth.state';

export const provideInfrastructure: () => readonly Provider[] = () => [
  { provide: BotApi, useClass: BotApiImpl },
  { provide: ProviderApi, useClass: ProviderApiImpl },
  { provide: AuthApi, useClass: AuthApiImpl },
  { provide: AuthState, useClass: AuthStateImpl },
];

export const provideInfrastructureMock: () => readonly Provider[] = () => [
  { provide: BotApi, useClass: BotApiImpl },
  { provide: AuthState, useClass: AuthStateImpl },
  { provide: ProviderApi, useClass: ProviderApiMock },
  { provide: AuthApi, useClass: AuthApiMock },
];
