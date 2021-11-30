import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class HoldingDto {
  @ApiProperty({
    title: 'Account Id',
    description: 'The Plaid account_id associated with the holding.',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly account_id: string;

  @ApiProperty({
    title: 'City',
    description: 'The cost basis of the holding.',
    type: Number,
  })
  @IsDefined()
  readonly cost_basis: number;

  @ApiProperty({
    title: 'Institution Price',
    description: 'The last price given by the institution for this security.',
    type: Number,
  })
  @IsDefined()
  readonly institution_price: number;

  @ApiProperty({
    title: 'Institution Price As Of',
    description: 'The date at which institution_price was current.',
    type: String,
  })
  @IsDefined()
  readonly institution_price_as_of: string;

  @ApiProperty({
    title: 'Institution Value',
    description: 'The value of the holding, as reported by the institution.',
    type: Number,
  })
  @IsDefined()
  readonly institution_value: number;

  @ApiProperty({
    title: 'ISO Currency Code',
    description: 'The ISO-4217 currency code of the holding.',
    type: String,
  })
  @IsDefined()
  readonly iso_currency_code: string;

  @ApiProperty({
    title: 'Quantity',
    description:
      'The total quantity of the asset held, as reported by the financial institution.',
    type: Number,
  })
  @IsDefined()
  readonly quantity: number;

  @ApiProperty({
    title: 'Security ID',
    description: 'The Plaid security_id associated with the holding.',
    type: String,
  })
  @IsDefined()
  readonly security_id: string;

  @ApiProperty({
    title: 'Unofficial Currency Code',
    description: 'The unofficial currency code associated with the holding.',
    type: String,
  })
  @IsDefined()
  readonly unofficial_currency_code: string;
}
