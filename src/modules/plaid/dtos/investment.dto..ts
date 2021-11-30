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
import { HoldingDto } from './holding.dto';
import { ItemMetadataDto } from './item.dto';
import { SecurityDto } from './security.dto';

/**
 * Main Investment DTO
 */
export class InvestmentDto {
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
    title: 'Holding data',
    type: [HoldingDto],
    description:
      'The holdings belonging to investment accounts associated with the Item.',
  })
  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => HoldingDto)
  readonly holdings: HoldingDto[];

  @ApiProperty({
    required: true,
    type: ItemMetadataDto,
    title: 'Item',
    description: 'Metadata about the Item.',
  })
  @IsDefined()
  readonly item: ItemMetadataDto;

  @ApiProperty({
    title: 'Securities',
    type: [SecurityDto],
    description:
      'Objects describing the securities held in the accounts associated with the Item.',
  })
  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SecurityDto)
  readonly securities: SecurityDto[];

  @ApiProperty({
    description: 'Request Id',
  })
  @Exclude()
  readonly request_id: string;
}
