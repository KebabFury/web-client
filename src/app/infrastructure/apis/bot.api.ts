import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BotApi } from '@application/apis/bot.api';

export class BotApiImpl {
  // extends BotApi
  private readonly _http = inject(HttpClient);
}
