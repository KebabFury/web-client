import { Injectable, inject } from '@angular/core';
import { ProviderApi } from '@application/apis/provider.api';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderCreateResponse } from '@domain/dtos/responses/provider-create.response';
import { CustomProvider } from '@domain/models/provider';
import { ProviderRepository } from '@domain/repositories/provider.repository';
import { Observable } from 'rxjs';

@Injectable()
export class ProviderRepositoryImpl extends ProviderRepository {
  private readonly _api = inject(ProviderApi);

  public get(): Observable<readonly CustomProvider[]> {
    return this._api.get();
  }

  public create(
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse> {
    return this._api.create(request);
  }
}
