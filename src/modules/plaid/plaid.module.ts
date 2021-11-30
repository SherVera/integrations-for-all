import { CacheModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PlaidConfiguration } from '../../config/plaid';
import { ApiKeyStrategy } from '../../protocols/apikey.protocol';
import { PlaidController } from './controllers/plaid.controller';
import { PlaidService } from './services/plaid.service';

@Module({
  imports: [PassportModule, CacheModule.register({ isGlobal: true })],
  providers: [ApiKeyStrategy, PlaidConfiguration, PlaidService],
  controllers: [PlaidController],
})
export class AuthModule {}
