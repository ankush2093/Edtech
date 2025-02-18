// // src/dto/pagination.dto.ts
// // PaginationDto dto Gobally used for pagination
// import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
// import { Type } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';

// export class PaginationDto {
//     @ApiProperty({ required: false })
//     @IsOptional()
//     @Type(() => Number)
//     @IsInt()
//     @Min(1)
//     Page?: number = 1;

//     @ApiProperty({ required: false })
//     @IsOptional()
//     @Type(() => Number)
//     @IsInt()
//     @Min(1)
//     Limit?: number = 10;

//     @ApiProperty({ required: false })
//     @IsOptional()
//     @Type(() => Boolean)
//     @IsBoolean()
//     Pagination?: boolean = true;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  Page?: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  Limit?: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Convert string values to a boolean properly
      return value.toLowerCase() === 'true';
    }
    return value;
  })
  Pagination?: boolean = true;
}
