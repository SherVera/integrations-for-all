import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class ItemMetadataDto {
  @ApiProperty({
    title: 'Available products',
    description:
      'A list of products available for the Item that have not yet been accessed.',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsDefined()
  readonly available_products: string[];

  @ApiProperty({
    title: 'Billed Products',
    description: 'A list of products that have been billed for the Item.',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsDefined()
  readonly billed_products: string[];

  @ApiProperty({
    title: 'Error',
    description: 'Error fields will be null if no error has occurred.',
  })
  @Exclude()
  readonly error: string;

  @ApiProperty({
    title: 'Institution ID associated with the Item.',
    description:
      'The Plaid Institution ID associated with the Item. Field is null for Items created via Same Day Micro-deposits.',
    type: String,
  })
  @IsNotEmpty()
  @IsDefined()
  readonly institution_id: string;

  @ApiProperty({
    title: 'Item ID.',
    description:
      'The Plaid Item ID. The item_id is always unique; linking the same account at the same institution twice will result in two Items with different item_id values.',
    type: String,
  })
  @IsNotEmpty()
  @IsDefined()
  readonly item_id: string;

  @ApiProperty({
    title: 'Update Type.',
    description:
      'Indicates whether an Item requires user interaction to be updated.',
    type: String,
  })
  readonly update_type: string;

  @ApiProperty({
    title: 'Webhook.',
    description: 'The URL registered to receive webhooks for the Item..',
    type: String,
  })
  @IsUrl()
  readonly webhook: string;

  @ApiProperty({
    title: 'Consent Expiration Time',
    description:
      'The RFC 3339 timestamp after which the consent provided by the end user will expire..',
    type: String,
  })
  readonly consent_expiration_time: string;
}

class TransactionsPartial {
  @ApiProperty({
    title: 'Last Successful Update.',
    description:
      'Timestamp of the last successful transactions update for the Item.',
    type: String,
  })
  @IsDefined()
  readonly last_successful_update: string;

  @ApiProperty({
    title: 'Last Failed Update.',
    description:
      'Timestamp of the last failed transactions update for the Item.',
    type: String,
  })
  @IsDefined()
  readonly las_failed_update: string;
}
class LastWebhook {
  @ApiProperty({
    title: 'Sent At.',
    description: 'Timestamp of when the webhook was fired.',
    type: String,
  })
  @IsDefined()
  readonly sent_at: string;

  @ApiProperty({
    title: 'Code Sent.',
    description: 'The last webhook code sent.',
    type: String,
  })
  @IsDefined()
  readonly code_sent: string;
}

export class StatusDto {
  @ApiProperty({
    title: 'Transactions.',
    description:
      'Information about the last successful and failed transactions update for the Item.',
    type: TransactionsPartial,
  })
  @IsDefined()
  readonly transactions: TransactionsPartial;

  @ApiProperty({
    title: 'Last Webhook',
    description: 'Information about the last webhook fired for the Item.',
    type: LastWebhook,
  })
  @IsDefined()
  readonly last_webhook: LastWebhook;
}

/**
 * Main Item DTO
 */

export class ItemDto {
  @ApiProperty({
    required: true,
    type: StatusDto,
    title: 'Status',
    description: 'An object with information about the status of the Item.',
  })
  @IsDefined()
  readonly status: StatusDto;

  @ApiProperty({
    required: true,
    type: ItemMetadataDto,
    title: 'Item',
    description: 'Metadata about the Item.',
  })
  @IsDefined()
  readonly item: ItemMetadataDto;
}
