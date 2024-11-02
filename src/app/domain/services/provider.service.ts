import { Injectable, inject } from '@angular/core';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderCreateResponse } from '@domain/dtos/responses/provider-create.response';
import { ProviderLight } from '@domain/models/provider';
import { ProviderRepository } from '@domain/repositories/provider.repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProviderService {
  private readonly _repository = inject(ProviderRepository);

  public get(): Observable<readonly ProviderLight[]> {
    return this._repository.get();
  }

  public create(
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse> {
    return this._repository.create(request);
  }
}
