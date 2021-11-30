import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { AccountDto } from './account.dto';
import { ItemMetadataDto } from './item.dto';

/**
 * Main Identity DTO
 */
export class IdentityDto {
  @ApiProperty({
    title: 'Accounts data',
    type: [AccountDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AccountDto)
  readonly accounts: AccountDto[];

  @ApiProperty({
    required: true,
    type: ItemMetadataDto,
    title: 'Item',
    description: 'Metadata about the Item.',
  })
  @IsDefined()
  readonly item: ItemMetadataDto;

  @ApiProperty({
    description: 'Request Id',
  })
  @Exclude()
  readonly request_id: string;
}
