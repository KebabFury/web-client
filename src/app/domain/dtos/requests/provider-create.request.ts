export interface ProviderCreateRequest {
  readonly name: string;
  readonly providerDescription: string;
  readonly swaggerJson: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly authorizationEndpoint: string;
  readonly tokenEndpoint: string;
  readonly scope: string;
}
