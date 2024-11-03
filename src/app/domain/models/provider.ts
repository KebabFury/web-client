export interface CustomProvider {
  readonly id: string;
  readonly name: string;
  readonly actionCode: string;
  readonly documentation: string;

  readonly clientId: string;
  readonly clientSecret: string;
  readonly authorizationEndpoint: string;
  readonly tokenEndpoint: string;
  readonly redirectUri: string;
  readonly scope: string;
}
