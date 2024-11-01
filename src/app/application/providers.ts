import { Provider } from '@angular/core';
import { BotRepository } from '@domain/repositories/bot.repository';
import { BotRepositoryImpl } from '@application/repositories/bot.repository';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { AuthRepositoryImpl } from '@application/repositories/auth.repository';

export const provideApplication: () => readonly Provider[] = () => [
  { provide: BotRepository, useClass: BotRepositoryImpl },
  { provide: AuthRepository, useClass: AuthRepositoryImpl },
];
