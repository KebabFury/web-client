import { Injectable, inject } from '@angular/core';
import { BotCreateRequest } from '@domain/dtos/requests/bot-create.request';
import { BotCreateResponse } from '@domain/dtos/responses/bot-create.response';
import { BotRepository } from '@domain/repositories/bot.repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BotService {
  private readonly _repository = inject(BotRepository);

  public create(request: BotCreateRequest): Observable<BotCreateResponse> {
    return this._repository.create(request);
  }
}
