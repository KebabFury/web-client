import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProviderApi } from '@application/apis/provider.api';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderCreateResponse } from '@domain/dtos/responses/provider-create.response';
import { ProviderLight } from '@domain/models/provider';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable()
export class ProviderApiImpl extends ProviderApi {
  private readonly _http = inject(HttpClient);

  public get(): Observable<readonly ProviderLight[]> {
    return this._http.get<readonly ProviderLight[]>(
      `${environment.api}/Provider/get-all`
    );
  }
  public create(
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse> {
    return this._http.post(
      `${environment.api}/Provider/create-provider`,
      request
    );
  }
}
