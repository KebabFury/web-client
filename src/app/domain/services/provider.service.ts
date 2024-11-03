import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderCreateResponse } from '@domain/dtos/responses/provider-create.response';
import { CustomProvider } from '@domain/models/provider';
import { ProviderRepository } from '@domain/repositories/provider.repository';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProviderService {
  private readonly _repository = inject(ProviderRepository);
  private readonly _router = inject(Router);

  public get(): Observable<readonly CustomProvider[]> {
    return this._repository.get();
  }

  public create(
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse> {
    return this._repository
      .create(request)
      .pipe(tap(() => this._router.navigate(['/providers'])));
  }
}
