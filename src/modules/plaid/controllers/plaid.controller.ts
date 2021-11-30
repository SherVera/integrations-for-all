import {
  Controller,
  Get,
  HttpCode,
  ParseArrayPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Products } from 'plaid';
import { IdentityDto } from '../dtos/identity.dto';
import { InstitutionsDto } from '../dtos/institutions.dto';
import { InvestmentDto } from '../dtos/investment.dto.';
import { ItemDto } from '../dtos/item.dto';
import { AccessTokenDto, QueryTransactionsDto } from '../dtos/queries.dto';
import { TransactionDto } from '../dtos/transaction.dto';
import { PlaidService } from '../services/plaid.service';

@Controller('plaid')
@ApiTags('Plaid')
export class PlaidController {
  constructor(private plaidService: PlaidService) {}

  /**
   *
   * @name getAccessToken
   * @description Get Access Token for an arbitrary institution ID, initial products
   * @query institution_id
   * @query initial_products
   * @returns access_token
   *
   */

  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Get Access Token',
    description:
      'Get Access Token for an arbitrary institution ID, initial products',
  })
  @ApiHeader({
    name: 'X-Api-Key',
    description: 'Api Key to Authorization',
    example: '60f85354b82d8357f36bd79e',
  })
  @ApiQuery({
    name: 'institution_id',
    type: String,
  })
  @ApiQuery({
    name: 'initial_products',
    isArray: true,
    example: [...Object.entries(Products).map((key) => key[1])],
  })
  @ApiOkResponse({
    description: 'Successful authentication.',
    type: AccessTokenDto,
  })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'An error has occurred.' })
  @Get('/token')
  async getAccessToken(
    @Query('institution_id') institution_id: string,
    @Query('initial_products', ParseArrayPipe) initial_products: Products[],
  ): Promise<AccessTokenDto> {
    return await this.plaidService.getAccessToken(
      institution_id,
      initial_products,
    );
  }

  /**
   *
   * @name getInstitutions
   * @description Get Institutions List
   * @query offset
   * @query count
   * @returns InstitutionsDto[]
   *
   */

  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Get Institutions List',
    description: 'Get Institutions List',
  })
  @ApiHeader({
    name: 'X-Api-Key',
    description: 'Api Key to Authorization',
    example: '60f85354b82d8357f36bd79e',
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
  })
  @ApiQuery({
    name: 'count',
    type: Number,
  })
  @ApiOkResponse({
    type: [InstitutionsDto],
    description: 'Institutions List.',
  })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'An error has occurred.' })
  @Get('/institutions')
  async getInstitutions(
    @Query('offset') offset: number,
    @Query('count') count: number,
  ): Promise<InstitutionsDto[]> {
    return await this.plaidService.getInstitutions(count, offset);
  }

  /**
   *
   * @name getIdentity
   * @description Retrieve various account holder information on file with the financial institution, including names, emails, phone numbers, and addresses
   * @query access_token
   * @returns IdentityDto
   *
   */

  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Retrieve identity data',
    description:
      'Retrieve various account holder information on file with the financial institution, including names, emails, phone numbers, and addresses',
  })
  @ApiHeader({
    name: 'X-Api-Key',
    description: 'Api Key to Authorization',
    example: '60f85354b82d8357f36bd79e',
  })
  @ApiQuery({
    name: 'access_token',
    type: String,
  })
  @ApiOkResponse({
    description: 'Identity data.',
    type: IdentityDto,
  })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'An error has occurred' })
  @Get('/identity/get')
  async getIdentity(
    @Query() queryParams: AccessTokenDto,
  ): Promise<IdentityDto> {
    const { access_token } = queryParams;
    return await this.plaidService.getIdentity(access_token);
  }

  /**
   *
   * @name getItem
   * @description Returns information about the status of an Item.
   * @query access_token
   * @returns ItemDto
   *
   */
  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Retrieve an Item',
    description: 'Returns information about the status of an Item.',
  })
  @ApiHeader({
    name: 'X-Api-Key',
    description: 'Api Key to Authorization',
    example: '60f85354b82d8357f36bd79e',
  })
  @ApiQuery({
    name: 'access_token',
    type: String,
  })
  @ApiOkResponse({
    description: 'Information Item.',
  })
  @HttpCode(200)
  @ApiBadRequestResponse({
    type: ItemDto,
    description: 'An error has occurred.',
  })
  @Get('/item/get')
  async getItem(@Query() queryParams: AccessTokenDto): Promise<ItemDto> {
    const { access_token } = queryParams;
    return await this.plaidService.getItem(access_token);
  }

  /**
   *
   * @name getInvestmentsHoldings
   * @description Receive user-authorized stock position data for investment-type accounts
   * @query access_token
   * @returns InvestmentDto
   *
   */

  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Get Investment holdings',
    description:
      'Receive user-authorized stock position data for investment-type accounts',
  })
  @ApiHeader({
    name: 'X-Api-Key',
    description: 'Api Key to Authorization',
    example: '60f85354b82d8357f36bd79e',
  })
  @ApiQuery({
    name: 'access_token',
    type: String,
  })
  @ApiOkResponse({
    type: InvestmentDto,
    description: 'Investment holdings.',
  })
  @HttpCode(200)
  @ApiBadRequestResponse({
    description: 'An error has occurred.',
  })
  @Get('/investments/holdings/get')
  async getInvestmentsHoldings(
    @Query() queryParams: AccessTokenDto,
  ): Promise<InvestmentDto> {
    const { access_token } = queryParams;
    return await this.plaidService.getInvestmentsHoldings(access_token);
  }

  /**
   *
   * @name getTransactions
   * @description Receive user-authorized transaction data for credit, depository, and some loan-type accounts (only those with account subtype student; coverage may be limited).
   * @query access_token
   * @query start_date
   * @query end_date
   * @returns TransactionDto
   *
   */

  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Get transaction data',
    description:
      'Receive user-authorized transaction data for credit, depository, and some loan-type accounts (only those with account subtype student; coverage may be limited).',
  })
  @ApiHeader({
    name: 'X-Api-Key',
    description: 'Api Key to Authorization',
    example: '60f85354b82d8357f36bd79e',
  })
  @ApiQuery({
    name: 'access_token',
    type: String,
  })
  @ApiQuery({
    name: 'start_date',
    type: String,
  })
  @ApiQuery({
    name: 'end_date',
    type: String,
  })
  @ApiOkResponse({
    description: 'Transaction data.',
    type: TransactionDto,
  })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'An error has occurred.' })
  @Get('/transactions/get')
  async getTransactions(
    @Query() queryParams: QueryTransactionsDto,
  ): Promise<TransactionDto> {
    const { access_token, start_date, end_date } = queryParams;
    return await this.plaidService.getTransactions(
      access_token,
      start_date,
      end_date,
    );
  }
}
