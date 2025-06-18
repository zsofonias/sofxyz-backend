import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { UpdatePortfolioDto } from '../dtos/update-portfolio.dto';
import { CreateProjectDto } from '../project/dtos/creat-project.dto';
import { CreateSkillDto } from '../skill/dtos/create-skill.dto';
import { diffById } from 'src/common/utils/diff-by-id.util';

@Injectable()
export class FindOneByIdAndUpdateProvider {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByIdAndUpdate(
    id: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ) {
    const { projects, skills, ...updatePortfolioData } = updatePortfolioDto;

    const portfolio = await this.prismaService.portfolio.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        projects: {
          select: {
            id: true,
          },
        },
        skills: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    const {
      toCreate: projectsToCreate,
      toUpdate: projectsToUpdate,
      toDelete: projectsToDelete,
    } = diffById(projects, portfolio.projects);

    // const projectsToCreate = (projects?.filter((p) => !p.id) ||
    //   []) as CreateProjectDto[];
    // const projectsToUpdate = projects?.filter((p) => p.id) || [];
    // const projectsToDelete =
    //   portfolio.projects?.filter(
    //     (ep) => !projectsToUpdate.some((up) => up.id === ep.id),
    //   ) || [];

    const {
      toCreate: skillsToCreate,
      toUpdate: skillsToUpdate,
      toDelete: skillsToDelete,
    } = diffById(skills, portfolio.skills);

    // const skillsToCreate = (skills?.filter((s) => !s.id) ||
    //   []) as CreateSkillDto[];
    // const skillsToUpdate = skills?.filter((s) => s.id) || [];
    // const skillsToDelete =
    //   portfolio.skills?.filter(
    //     (es) => !skillsToUpdate.some((us) => us.id === es.id),
    //   ) || [];

    const transactions: Prisma.PrismaPromise<any>[] = [];

    // if (projectsToDelete.length) {
    //   transactions.push(
    //     this.prismaService.project.deleteMany({
    //       where: {
    //         id: {
    //           in: projectsToDelete.map((p) => p.id),
    //         },
    //       },
    //     }),
    //   );
    // }

    transactions.push(
      this.prismaService.portfolio.update({
        where: { id },
        data: {
          ...updatePortfolioData,
          projects: {
            ...(projectsToCreate.length && {
              create: projectsToCreate as CreateProjectDto[],
            }),
            ...(projectsToUpdate.length && {
              update: projectsToUpdate?.map((p) => ({
                where: {
                  id: p.id,
                },
                data: p,
              })),
            }),
            ...(projectsToDelete.length && { delete: projectsToDelete }),
          },
          skills: {
            ...(skillsToCreate.length && {
              create: skillsToCreate as CreateSkillDto[],
            }),
            ...(skillsToUpdate.length && {
              update: skillsToUpdate?.map((s) => ({
                where: {
                  id: s.id,
                },
                data: s,
              })),
            }),
            ...(skillsToDelete.length && { delete: skillsToDelete }),
          },
        },
        include: {
          projects: {
            select: {
              id: true,
              title: true,
              description: true,
              image: true,
              link: true,
              repoUrl: true,
            },
          },
          skills: {
            select: {
              name: true,
              description: true,
              level: true,
            },
          },
        },
      }),
    );

    const [updatedPortfolio] =
      await this.prismaService.$transaction(transactions);

    return updatedPortfolio;
  }
}
