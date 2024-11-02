import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BotApi } from '@application/apis/bot.api';
import { BotCreateRequest } from '@domain/dtos/requests/bot-create.request';
import { BotCreateResponse } from '@domain/dtos/responses/bot-create.response';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable()
export class BotApiImpl extends BotApi {
  private readonly _http = inject(HttpClient);
  private readonly _prefix = `${environment.api}/Bot`;

  public create(request: BotCreateRequest): Observable<BotCreateResponse> {
    return this._http.post<BotCreateResponse>(this._prefix, request);
  }
}
