import { Injectable } from '@angular/core';
import { BotCreateRequest } from '@domain/dtos/requests/bot-create.request';
import { BotCreateResponse } from '@domain/dtos/responses/bot-create.response';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BotApi {
  public abstract create(
    request: BotCreateRequest
  ): Observable<BotCreateResponse>;
}
