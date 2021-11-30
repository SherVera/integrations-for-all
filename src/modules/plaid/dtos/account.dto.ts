import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OwnerDto } from './owner.dto';
class BalanceDto {
  @ApiProperty({
    title: 'Available',
    description:
      'The amount of funds available to be withdrawn from the account, as determined by the financial institution.',
    type: Number,
  })
  @IsNumber()
  @IsDefined()
  readonly available: number;

  @ApiProperty({
    title: 'Current',
    description: 'The total amount of funds in or owed by the account.',
    type: Number,
  })
  @IsNumber()
  @IsDefined()
  readonly current: number;

  @ApiProperty({
    title: 'ISO Currency Code',
    description: 'The ISO-4217 currency code of the balance. .',
    type: String,
  })
  @IsDefined()
  readonly iso_currency_code: string;

  @ApiProperty({
    title: 'Limit',
    description: 'For credit-type accounts, this represents the credit limit.',
    type: Number,
  })
  @IsDefined()
  readonly limit: number;

  @ApiProperty({
    title: 'Unofficial Currency Code',
    description:
      'The unofficial currency code associated with the balance. Always null if iso_currency_code is non-null.',
    type: String,
  })
  @IsDefined()
  readonly unofficial_currency_code: string;
}

/**
 * Main Account DTO
 */
export class AccountDto {
  @ApiProperty({
    required: true,
    type: BalanceDto,
    title: 'Balances',
    description: 'A set of fields describing the balance for an account.',
  })
  @IsDefined()
  readonly balances: BalanceDto;

  @ApiProperty({
    title: 'Account Id',
    description: 'Plaid’s unique identifier for the account.',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly account_id: string;

  @ApiProperty({
    title: 'Mask',
    description: `The last 2-4 alphanumeric characters of an account's official account number.`,
    type: String,
  })
  @IsDefined()
  readonly mask: string;

  @ApiProperty({
    title: 'Name',
    description: 'The name of the account.',
    type: String,
  })
  @IsDefined()
  readonly name: string;

  @ApiProperty({
    title: 'Official Name',
    description:
      'The official name of the account as given by the financial institution',
    type: String,
  })
  @IsDefined()
  readonly official_name: string;

  @ApiProperty({
    title: 'Owners',
    description:
      'Data returned by the financial institution about the account owner or owners.',
    type: [OwnerDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => OwnerDto)
  readonly owners: OwnerDto[];

  @ApiProperty({
    title: 'Subtype',
    description: 'Corresponding Subtypes',
    type: String,
  })
  @IsDefined()
  readonly subtype: string;

  @ApiProperty({
    title: 'Type',
    description: 'Type Investment account.',
    type: String,
  })
  @IsDefined()
  readonly type: string;
}
