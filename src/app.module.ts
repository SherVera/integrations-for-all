import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config/config';
import { enviroments } from './config/enviroments';
import { AuthModule } from './modules/plaid/plaid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        HTTPS_PORT: Joi.number().required(),
        API_KEY: Joi.string().required(),
        PLAID_CLIENT_ID: Joi.string().required(),
        PLAID_DEV: Joi.string().required(),
        PLAID_SANDBOX: Joi.string().required(),
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}
