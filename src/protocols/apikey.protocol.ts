import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import config from '../config/config';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super(
      {
        header: 'X-Api-Key',
        prefix: '',
      },
      true,
      (headerApiKey, done) => {
        return this.validate(headerApiKey, configService.apiKey, done);
      },
    );
  }

  public async validate(
    headerApiKey: string,
    apiKey: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    done: (arg0: Error, data: any) => {},
  ) {
    if (headerApiKey !== apiKey) {
      return done(new BadRequestException('Invalid Api Key'), null);
    }
    return done(null, true);
  }
}
