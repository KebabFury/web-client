import { Injectable } from '@angular/core';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderCreateResponse } from '@domain/dtos/responses/provider-create.response';
import { CustomProvider } from '@domain/models/provider';
import { Observable } from 'rxjs';

@Injectable()
export abstract class ProviderApi {
  public abstract get(): Observable<readonly CustomProvider[]>;
  public abstract create(
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse>;
}
