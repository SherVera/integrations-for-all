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
import { InstitutionsDto } from '../dtos/institutions.dto';
import { AccessTokenDto, QueryTransactionsDto } from '../dtos/queries.dto';
import { PlaidService } from '../services/plaid.service';

@Controller('plaid')
@ApiTags('Plaid')
export class PlaidController {
  constructor(private plaidService: PlaidService) {}

  /**
   *
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
  async getPublicToken(
    @Query('institution_id') institution_id: string,
    @Query('initial_products', ParseArrayPipe) initial_products: Products[],
  ): Promise<AccessTokenDto> {
    return await this.plaidService.getPublicToken(
      institution_id,
      initial_products,
    );
  }

  /**
   *
   * @description Retrieve various account holder information on file with the financial institution, including names, emails, phone numbers, and addresses
   * @query access_token
   * @returns access_token
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
    description: 'Autenticacion Exitosa.',
  })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Ha ocurrido un error.' })
  @Get('/identity/get')
  async getIdentity(@Query() queryParams: AccessTokenDto): Promise<any> {
    const { access_token } = queryParams;
    return await this.plaidService.getIdentity(access_token);
  }

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
  async institutionsGet(
    @Query('offset') offset: number,
    @Query('count') count: number,
  ): Promise<InstitutionsDto[]> {
    return await this.plaidService.institutionsGet(count, offset);
  }

  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Autenticacion de Usuario',
    description: 'Autenticacion de usuario previamente registrado y verificado',
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
    description: 'Autenticacion Exitosa.',
  })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Ha ocurrido un error.' })
  @Get('/item/get')
  async getItem(@Query() queryParams: AccessTokenDto): Promise<any> {
    const { access_token } = queryParams;
    return await this.plaidService.getItem(access_token);
  }

  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Autenticacion de Usuario',
    description: 'Autenticacion de usuario previamente registrado y verificado',
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
    description: 'Autenticacion Exitosa.',
  })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Ha ocurrido un error.' })
  @Get('/investments/holdings/get')
  async getInvestmentsHoldings(
    @Query() queryParams: AccessTokenDto,
  ): Promise<any> {
    const { access_token } = queryParams;
    return await this.plaidService.getInvestmentsHoldings(access_token);
  }

  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({
    summary: 'Autenticacion de Usuario',
    description: 'Autenticacion de usuario previamente registrado y verificado',
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
    description: 'Autenticacion Exitosa.',
  })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Ha ocurrido un error.' })
  @Get('/transactions/get')
  async getTransactions(
    @Query() queryParams: QueryTransactionsDto,
  ): Promise<any> {
    const { access_token, start_date, end_date } = queryParams;
    return await this.plaidService.getTransactions(
      access_token,
      start_date,
      end_date,
    );
  }
}
