import { Injectable } from '@angular/core';
import { ProviderApi } from '@application/apis/provider.api';
import { ProviderCreateRequest } from '@domain/dtos/requests/provider-create.request';
import { ProviderCreateResponse } from '@domain/dtos/responses/provider-create.response';
import { ProviderLight } from '@domain/models/provider';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';

@Injectable()
export class ProviderApiMock extends ProviderApi {
  private readonly _providers$ = new BehaviorSubject<readonly ProviderLight[]>([
    {
      name: 'Yandex Cloud Provider',
      actionCode: 'YandexCloudActionCode',
      documentation: '{}',
    },
    {
      name: 'Todoist Provider',
      actionCode: 'TodoistActionCode',
      documentation: '{}',
    },
    {
      name: 'Trello Provider',
      actionCode: 'TrelloActionCode',
      documentation: '{}',
    },
    {
      name: 'Skype Provider',
      actionCode: 'SkypeActionCode',
      documentation: '{}',
    },
    {
      name: 'Jira Provider',
      actionCode: 'JiraActionCode',
      documentation: '{}',
    },
    {
      name: 'Youtrack Provider',
      actionCode: 'YoutrackActionCode',
      documentation: '{}',
    },
  ]);

  public get(): Observable<readonly ProviderLight[]> {
    return this._providers$;
  }
  public create(
    request: ProviderCreateRequest
  ): Observable<ProviderCreateResponse> {
    this._providers$.next([
      {
        name: request.name,
        actionCode: request.clientId,
        documentation: request.swaggerJson,
      },
      ...this._providers$.value,
    ]);

    return of().pipe(delay(2000));
  }
}
