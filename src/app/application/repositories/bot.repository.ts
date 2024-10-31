import { inject } from '@angular/core';
import { BotApi } from '@application/apis/bot.api';
import { BotCreateRequest } from '@domain/dtos/requests/bot-create.request';
import { BotCreateResponse } from '@domain/dtos/responses/bot-create.response';
import { BotRepository } from '@domain/repositories/bot.repository';
import { Observable } from 'rxjs';

export class BotRepositoryImpl extends BotRepository {
  private readonly _api = inject(BotApi);

  public create(request: BotCreateRequest): Observable<BotCreateResponse> {
    return this._api.create(request);
  }
}
