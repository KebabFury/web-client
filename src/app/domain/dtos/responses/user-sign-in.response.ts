import { ID } from '@domain/models/common';

export interface UserSignInResponse {
  readonly id: ID;
  readonly name: string;
  readonly email: string;

  readonly accessToken: string;
}
