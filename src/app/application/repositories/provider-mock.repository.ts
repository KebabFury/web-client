import { Injectable } from '@angular/core';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderCreateResponse } from '@domain/dtos/responses/provider-create.response';
import { ProviderLight } from '@domain/models/provider';
import { ProviderRepository } from '@domain/repositories/provider.repository';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProviderRepositoryMock extends ProviderRepository {
//   private readonly _api = inject(ProviderApi);

  private _providers: ProviderLight[] = [
    {
      name: 'Provider 1',
      actionCode: 'ACTION_1',
      documentation: 'Documentation for provider 1',
    },
    {
      name: 'Provider 2',
      actionCode: 'ACTION_2',
      documentation: 'Documentation for provider 2',
    },
    {
      name: 'Provider 3',
      actionCode: 'ACTION_3',
      documentation: 'Documentation for provider 3',
    },
    {
      name: 'Provider 4',
      actionCode: 'ACTION_4',
      documentation: 'Documentation for provider 4',
    },
    {
      name: 'Provider 5',
      actionCode: 'ACTION_5',
      documentation: 'Documentation for provider 5',
    },
  ];

  public get(): Observable<readonly ProviderLight[]> {
    return of(this._providers);
  }
  

  public create(
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse> {
    const newProvider = {
        name: "testCreateProvider-" + this._providers.length + 1,
        actionCode: "FGk123kF45GkD$32",
        documentation: "Description Description Description Description Description Description"
    };
    this._providers.push(newProvider)
    return of(newProvider);
  }
}
