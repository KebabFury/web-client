import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderCreateResponse } from '@domain/dtos/responses/provider-create.response';
import { CustomProvider } from '@domain/models/provider';
import { Observable } from 'rxjs';

export abstract class ProviderRepository {
  public abstract get(): Observable<readonly CustomProvider[]>;
  public abstract getById(id: string): Observable<CustomProvider>;
  public abstract create(
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse>;
  public abstract update(
    id: string,
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse>;
}
