import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationDto } from './dtos/pagination.dto';
import { IPaginatedResponse } from './interfaces/paginated-response.interface';

@Injectable()
export class PaginationService {
  constructor(private readonly prismaService: PrismaService) {}

  async paginateQuery<T>(
    model: string,
    query: Record<string, any>,
    pagination: PaginationDto,
    sortFields: string[] = [],
  ): Promise<IPaginatedResponse<T>> {
    const { page, limit: take, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * take;

    if (sortFields.length && !sortFields.includes(sortBy)) {
      throw new BadRequestException([`Invalid sort field: ${sortBy}`]);
    }

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService[model].findMany({
        ...query,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prismaService[model].count({ where: query.where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    };
  }
}
