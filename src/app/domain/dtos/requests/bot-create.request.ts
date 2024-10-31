export interface BotCreateRequest {
  readonly tgToken: string;
  readonly needAuth: boolean;
  readonly oauthClient?: string;
  readonly oauthSecret?: string;
  readonly oauthHost?: string;
}
