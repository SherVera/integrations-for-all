import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class SecurityDto {
  @ApiProperty({
    title: 'Close Price',
    description:
      'Price of the security at the close of the previous trading session.',
    type: String,
  })
  @IsDefined()
  readonly close_price: string;

  @ApiProperty({
    title: 'Close Price As Of',
    description: 'Date for which close_price is accurate.',
    type: String,
  })
  @IsDefined()
  readonly close_price_as_of: string;

  @ApiProperty({
    title: 'Cusip',
    description:
      '9-character CUSIP, an identifier assigned to North American securities.',
    type: String,
  })
  @IsDefined()
  readonly cusip: string;

  @ApiProperty({
    title: 'Institution ID',
    description:
      'If institution_security_id is present, this field indicates the Plaid institution_id of the institution to whom the identifier belongs.',
    type: String,
  })
  @IsDefined()
  readonly institution_id: string;

  @ApiProperty({
    title: 'Institution Security ID',
    description: 'An identifier given to the security by the institution.',
    type: String,
  })
  @IsDefined()
  readonly institution_security_id: string;

  @ApiProperty({
    title: 'Is Cash Equivalent',
    description:
      'Indicates that a security is a highly liquid asset and can be treated like cash.',
    type: Boolean,
  })
  @IsDefined()
  readonly is_cash_equivalent: boolean;

  @ApiProperty({
    title: 'Isin',
    description: '12-character ISIN, a globally unique securities identifier.',
    type: String,
  })
  @IsDefined()
  readonly isin: string;

  @ApiProperty({
    title: 'ISO Currency Code',
    description: 'The ISO-4217 currency code of the price given.',
    type: String,
  })
  @IsDefined()
  readonly iso_currency_code: string;

  @ApiProperty({
    title: 'name',
    description: 'A descriptive name for the security, suitable for display.',
    type: String,
  })
  @IsDefined()
  readonly name: string;

  @ApiProperty({
    title: 'Proxy Security ID',
    description:
      'In certain cases, Plaid will provide the ID of another security whose performance resembles this security',
    type: String,
  })
  @IsDefined()
  readonly proxy_security_id: string;

  @ApiProperty({
    title: 'Security ID',
    description:
      'A unique, Plaid-specific identifier for the security, used to associate securities with holdings.',
    type: String,
  })
  @IsDefined()
  readonly security_id: string;

  @ApiProperty({
    title: 'SEDOL',
    description:
      '7-character SEDOL, an identifier assigned to securities in the UK.',
    type: String,
  })
  @IsDefined()
  readonly sedol: string;

  @ApiProperty({
    title: 'Ticker Symbol',
    description:
      'The security’s trading symbol for publicly traded securities, and otherwise a short identifier if available.',
    type: String,
  })
  @IsDefined()
  readonly ticker_symbol: string;

  @ApiProperty({
    title: 'Type',
    description: 'The security type of the holding. ',
    type: String,
  })
  @IsDefined()
  readonly type: string;

  @ApiProperty({
    title: 'Unofficial Currency Code',
    description:
      'The unofficial currency code associated with the security. Always null if iso_currency_code is non-null.',
    type: String,
  })
  @IsDefined()
  readonly unofficial_currency_code: string;
}
