import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { deserialize, deserializeArray, serialize } from 'class-transformer';
import * as momentAll from 'moment';
import {
  CountryCode,
  IdentityGetRequest,
  InstitutionsGetRequest,
  InvestmentsHoldingsGetRequest,
  ItemGetRequest,
  ItemPublicTokenExchangeRequest,
  Products,
  SandboxPublicTokenCreateRequest,
  TransactionsGetRequest,
} from 'plaid';
import config from '../../../config/config';
import { PlaidConfiguration } from '../../../config/plaid';
import { IdentityDto } from '../dtos/identity.dto';
import { InstitutionsDto } from '../dtos/institutions.dto';
import { InvestmentDto } from '../dtos/investment.dto.';
import { ItemDto } from '../dtos/item.dto';
import { AccessTokenDto } from '../dtos/queries.dto';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class PlaidService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private clientPlaid: PlaidConfiguration,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async getAccessToken(
    institutionId: string,
    initial_products: Products[],
  ): Promise<AccessTokenDto> {
    try {
      const request: SandboxPublicTokenCreateRequest = {
        institution_id: institutionId,
        initial_products: initial_products,
      };

      const {
        data: { public_token },
      } = await this.clientPlaid.client.sandboxPublicTokenCreate(request);

      const exchangeRequest: ItemPublicTokenExchangeRequest = {
        public_token: public_token,
      };
      const {
        data: { access_token },
      } = await this.clientPlaid.client.itemPublicTokenExchange(
        exchangeRequest,
      );
      const serialized = serialize({ access_token: access_token });
      const deserialized = deserialize(AccessTokenDto, serialized);
      return deserialized;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInstitutions(
    count: number,
    offset: number,
  ): Promise<InstitutionsDto[]> {
    const request: InstitutionsGetRequest = {
      count: count || 10,
      offset: offset || 0,
      country_codes: [CountryCode.Us],
    };
    try {
      const {
        data: { institutions },
      } = await this.clientPlaid.client.institutionsGet(request);
      const serialized = serialize(institutions);
      const deserialized = deserializeArray(InstitutionsDto, serialized, {
        exposeUnsetFields: true,
      });
      return deserialized;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getIdentity(access_token: string): Promise<IdentityDto> {
    const request: IdentityGetRequest = {
      access_token: access_token,
    };
    try {
      const { data } = await this.clientPlaid.client.identityGet(request);
      const serialized = serialize(data);
      const deserialized = deserialize(IdentityDto, serialized, {
        exposeUnsetFields: true,
      });
      return deserialized;
    } catch (error) {
      throw error;
    }
  }

  async getItem(access_token: string): Promise<ItemDto> {
    const request: ItemGetRequest = {
      access_token: access_token,
    };
    try {
      const { data } = await this.clientPlaid.client.itemGet(request);
      const serialized = serialize(data);
      const deserialized = deserialize(ItemDto, serialized, {
        exposeUnsetFields: true,
      });
      return deserialized;
    } catch (error) {
      throw error;
    }
  }

  async getInvestmentsHoldings(access_token: string): Promise<InvestmentDto> {
    const request: InvestmentsHoldingsGetRequest = {
      access_token: access_token,
    };
    try {
      const { data } = await this.clientPlaid.client.investmentsHoldingsGet(
        request,
      );
      const serialized = serialize(data);
      const deserialized = deserialize(InvestmentDto, serialized, {
        exposeUnsetFields: true,
      });
      return deserialized;
    } catch (error) {
      const {
        response: {
          data: { error_code, error_message },
        },
      } = error;
      if (error_code === 'PRODUCTS_NOT_SUPPORTED') {
        throw new BadRequestException(error_message);
      }
      throw error;
    }
  }

  async getTransactions(
    access_token: string,
    start_date: string,
    end_date: string,
  ): Promise<TransactionDto> {
    const request: TransactionsGetRequest = {
      access_token: access_token,
      start_date:
        start_date || momentAll().subtract(1, 'days').format('YYYY-MM-DD'),
      end_date: end_date || momentAll().format('YYYY-MM-DD'),
    };
    try {
      const { data } = await this.clientPlaid.client.transactionsGet(request);
      const serialized = serialize(data);
      const deserialized = deserialize(TransactionDto, serialized, {
        exposeUnsetFields: true,
      });
      return deserialized;
    } catch (error) {
      throw error;
    }
  }
}
