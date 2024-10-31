import { Provider } from '@angular/core';
import { BotRepository } from '@domain/repositories/bot.repository';
import { BotRepositoryImpl } from '@application/repositories/bot.repository';

export const provideApplication: () => readonly Provider[] = () => [
  { provide: BotRepository, useClass: BotRepositoryImpl },
];
