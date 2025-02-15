// src/dto/pagination.dto.ts
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    Page?: number = 1;

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    Limit?: number = 10;

    @ApiProperty()
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    Pagination?: boolean = true;
}
