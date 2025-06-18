import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { CreateSkillDto } from './dtos/create-skill.dto';
import { UpdateSkillDto } from './dtos/update-skill.dto';

@Injectable()
export class SkillService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSkillDto: CreateSkillDto) {
    return this.prismaService.skill.create({
      data: createSkillDto,
    });
  }

  async findAll() {
    return this.prismaService.skill.findMany();
  }

  async findOne(
    filter: Prisma.SkillWhereUniqueInput,
    select?: Prisma.SkillSelect,
  ) {
    return this.prismaService.skill.findUnique({
      where: filter,
      select,
    });
  }

  async findOneWithException(
    filter: Prisma.SkillWhereUniqueInput,
    select?: Prisma.SkillSelect,
  ) {
    const skill = await this.findOne(filter, select);
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    return skill;
  }

  async findOneById(id: string) {
    return this.findOneWithException({ id });
  }

  async findOneByIdAndUpdate(id: string, updateSkillDto: UpdateSkillDto) {
    await this.findOneWithException({ id });

    return this.prismaService.skill.update({
      where: { id },
      data: updateSkillDto,
    });
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneWithException({ id });
    return this.prismaService.skill.delete({
      where: { id },
    });
  }
}
