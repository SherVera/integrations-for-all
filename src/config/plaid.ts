import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import config from './config';

@Injectable()
export class PlaidConfiguration {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  private readonly configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': this.configService.plaidClientId,
        'PLAID-SECRET': this.configService.plaidSandbox,
      },
    },
  });

  public client = new PlaidApi(this.configuration);
}
