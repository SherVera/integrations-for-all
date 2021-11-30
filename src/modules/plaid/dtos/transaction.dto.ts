import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { AccountDto } from './account.dto';
import { ItemDto } from './item.dto';

class Location {
  @ApiProperty({
    title: 'Address',
    type: String,
    description: 'The street address where the transaction occurred.',
  })
  @IsDefined()
  readonly address: string;

  @ApiProperty({
    title: 'City',
    description: 'The city where the transaction occurred.',
    type: String,
  })
  @IsDefined()
  readonly city: string;

  @ApiProperty({
    title: 'Region',
    description: 'The region or state where the transaction occurred.',
    type: String,
  })
  @IsDefined()
  readonly region: string;

  @ApiProperty({
    title: 'Postal Code',
    description: 'The postal code where the transaction occurred.',
    type: String,
  })
  @IsDefined()
  readonly postal_code: string;

  @ApiProperty({
    title: 'Country',
    description:
      'The ISO 3166-1 alpha-2 country code where the transaction occurred.',
    type: String,
  })
  @IsDefined()
  readonly country: string;

  @ApiProperty({
    title: 'Lat',
    description: 'The latitude where the transaction occurred.',
    type: Number,
  })
  @IsDefined()
  readonly lat: number;

  @ApiProperty({
    title: 'Lon',
    description: 'The longitude where the transaction occurred.',
    type: Number,
  })
  @IsDefined()
  readonly lon: number;

  @ApiProperty({
    title: 'Store Number',
    description:
      'The merchant defined store number where the transaction occurred.',
    type: String,
  })
  @IsDefined()
  readonly store_number: string;
}

class PaymentMeta {
  @ApiProperty({
    title: 'By Order Of',
    type: String,
    description: 'The party initiating a wire transfer. ',
  })
  @IsDefined()
  readonly by_order_of: string;

  @ApiProperty({
    title: 'Payee',
    description: 'For transfers, the party that is receiving the transaction.',
    type: String,
  })
  @IsDefined()
  readonly payee: string;

  @ApiProperty({
    title: 'payer',
    description: 'For transfers, the party that is paying the transaction.',
    type: String,
  })
  @IsDefined()
  readonly payer: string;

  @ApiProperty({
    title: 'Payment Method',
    description: 'The type of transfer.',
    type: String,
  })
  @IsDefined()
  readonly payment_method: string;

  @ApiProperty({
    title: 'Payment Processor',
    description: 'The name of the payment processor.',
    type: String,
  })
  @IsDefined()
  readonly payment_processor: string;

  @ApiProperty({
    title: 'Ppd ID',
    description: 'The ACH PPD ID for the payer.',
    type: String,
  })
  @IsDefined()
  readonly ppd_id: string;

  @ApiProperty({
    title: 'Reason',
    description: 'The payer-supplied description of the transfer.',
    type: String,
  })
  @IsDefined()
  readonly reason: string;

  @ApiProperty({
    title: 'Reference Number',
    description:
      'The transaction reference number supplied by the financial institution.',
    type: String,
  })
  @IsDefined()
  readonly reference_number: string;
}

export class TransactionsMetadataDto {
  @ApiProperty({
    title: 'Account Id.',
    description: 'The ID of the account in which this transaction occurred.',
    type: String,
  })
  @IsDefined()
  readonly account_id: string;

  @ApiProperty({
    title: 'Amount.',
    description: `The settled value of the transaction, denominated in the account's currency`,
    type: Number,
  })
  @IsDefined()
  readonly amount: number;

  @ApiProperty({
    title: 'ISO Currency Code',
    description: 'The ISO-4217 currency code of the transaction.',
    type: String,
  })
  @IsDefined()
  readonly iso_currency_code: string;

  @ApiProperty({
    title: 'Unofficial Currency Code',
    description:
      'The unofficial currency code associated with the transaction.',
    type: String,
  })
  @IsDefined()
  readonly unofficial_currency_code: string;

  @ApiProperty({
    title: 'Category',
    description:
      'A hierarchical array of the categories to which this transaction belongs.',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsDefined()
  readonly category: string[];

  @ApiProperty({
    title: 'Category Id',
    description: 'The ID of the category to which this transaction belongs.',
    type: String,
  })
  @IsDefined()
  readonly category_id: string;

  @ApiProperty({
    title: 'Check Number',
    description:
      'The check number of the transaction. This field is only populated for check transactions.',
    type: String,
  })
  @IsDefined()
  readonly check_number: string;

  @ApiProperty({
    title: 'Date',
    description:
      'For pending transactions, the date that the transaction occurred.',
    type: String,
  })
  @IsDefined()
  readonly date: string;

  @ApiProperty({
    title: 'Datetime',
    description:
      'Date and time when a transaction was posted in ISO 8601 format ( YYYY-MM-DDTHH:mm:ssZ )',
    type: String,
  })
  @IsDefined()
  readonly datetime: string;

  @ApiProperty({
    title: 'Authorized Date',
    description:
      'The date that the transaction was authorized. Dates are returned in an ISO 8601 format ( YYYY-MM-DD ).',
    type: String,
  })
  @IsDefined()
  readonly authorized_date: string;

  @ApiProperty({
    required: true,
    type: Location,
    title: 'Location',
    description: 'A representation of where a transaction took place',
  })
  @IsDefined()
  readonly location: Location;

  @ApiProperty({
    title: 'Name',
    description: 'The merchant name or transaction description.',
    type: String,
  })
  @IsDefined()
  readonly name: string;

  @ApiProperty({
    title: 'Merchant Name',
    description:
      'The merchant name, as extracted by Plaid from the name field.',
    type: String,
  })
  @IsDefined()
  readonly merchant_name: string;

  @ApiProperty({
    required: true,
    type: PaymentMeta,
    title: 'Payment Meta',
    description: 'Transaction information specific to inter-bank transfers.',
  })
  @IsDefined()
  readonly payment_meta: PaymentMeta;

  @ApiProperty({
    title: 'Payment Channel',
    description: 'The channel used to make a payment.',
    type: String,
  })
  @IsDefined()
  readonly payment_channel: string;

  @ApiProperty({
    title: 'Pending',
    description:
      'When true, identifies the transaction as pending or unsettled.',
    type: Boolean,
  })
  @IsBoolean()
  @IsDefined()
  readonly pending: boolean;

  @ApiProperty({
    title: 'Pending Transaction ID',
    description: `The ID of a posted transaction's associated pending transaction, where applicable.`,
    type: String,
  })
  @IsDefined()
  readonly pending_transaction_id: string;

  @ApiProperty({
    title: 'Account Owner',
    description: 'The name of the account owner.',
    type: String,
  })
  @IsDefined()
  readonly account_owner: string;

  @ApiProperty({
    title: 'Transaction ID',
    description: 'The unique ID of the transaction.',
    type: String,
  })
  @IsDefined()
  readonly transaction_id: string;

  @ApiProperty({
    title: 'Transaction Code',
    description: 'An identifier classifying the transaction type.',
    type: String,
  })
  @IsDefined()
  readonly transaction_code: string;

  @ApiProperty({
    title: 'Transaction Type',
    description: 'Possible values: digital, place, special, unresolved.',
    type: String,
  })
  @IsDefined()
  readonly transaction_type: string;
}

/**
 * Main Transaction DTO
 */

export class TransactionDto {
  @ApiProperty({
    required: true,
    type: ItemDto,
    title: 'Item',
    description: 'Metadata about the Item.',
  })
  @IsDefined()
  readonly item: ItemDto;

  @ApiProperty({
    title: 'Accounts',
    description:
      'An array containing the accounts associated with the Item for which transactions are being returned.',
    type: [AccountDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AccountDto)
  readonly accounts: AccountDto[];

  @ApiProperty({
    title: 'Transactions',
    description: 'An array containing transactions from the account.',
    type: [TransactionsMetadataDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TransactionsMetadataDto)
  readonly transactions: TransactionsMetadataDto[];

  @ApiProperty({
    required: true,
    type: Number,
    title: 'Total Transactions',
    description:
      'The total number of transactions available within the date range specified.',
  })
  @IsDefined()
  readonly total_transactions: number;

  @ApiProperty({
    description: 'Request Id',
  })
  @Exclude()
  readonly request_id: string;
}
