import { ID } from './common';

export interface Bot {
  readonly id: ID;
  readonly ownerId: ID;
  readonly tgToken: string;
  readonly needAuth: boolean;

  readonly oauthClient?: string;
  readonly oauthSecret?: string;
  readonly oauthHost?: string;
}
