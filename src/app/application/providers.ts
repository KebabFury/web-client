import { Provider } from '@angular/core';
import { AuthRepositoryImpl } from '@application/repositories/auth.repository';
import { BotRepositoryImpl } from '@application/repositories/bot.repository';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { BotRepository } from '@domain/repositories/bot.repository';
import { ProviderRepository } from '@domain/repositories/provider.repository';
import { ProviderRepositoryImpl } from './repositories/provider.repository';

export const provideApplication: () => readonly Provider[] = () => [
  { provide: BotRepository, useClass: BotRepositoryImpl },
  { provide: AuthRepository, useClass: AuthRepositoryImpl },
  { provide: ProviderRepository, useClass: ProviderRepositoryImpl },
];
