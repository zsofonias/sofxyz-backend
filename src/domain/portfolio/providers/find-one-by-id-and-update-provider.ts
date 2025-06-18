import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { UpdatePortfolioDto } from '../dtos/update-portfolio.dto';
import { CreateProjectDto } from '../project/dtos/creat-project.dto';
import { CreateSkillDto } from '../skill/dtos/create-skill.dto';
import { CreateExperienceDto } from '../experience/dtos/create-experience.dto';
import { CreateEducationDto } from '../education/dtos/create-education.dto';

import { diffById } from 'src/common/utils/diff-by-id.util';

@Injectable()
export class FindOneByIdAndUpdateProvider {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByIdAndUpdate(
    id: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ) {
    const {
      projects,
      skills,
      experiences,
      educations,
      ...updatePortfolioData
    } = updatePortfolioDto;

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
        experiences: {
          select: {
            id: true,
          },
        },
        educations: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    // const projectsToCreate = (projects?.filter((p) => !p.id) ||
    //   []) as CreateProjectDto[];
    // const projectsToUpdate = projects?.filter((p) => p.id) || [];
    // const projectsToDelete =
    //   portfolio.projects?.filter(
    //     (ep) => !projectsToUpdate.some((up) => up.id === ep.id),
    //   ) || [];

    const {
      toCreate: projectsToCreate,
      toUpdate: projectsToUpdate,
      toDelete: projectsToDelete,
    } = diffById(projects, portfolio.projects);

    const {
      toCreate: skillsToCreate,
      toUpdate: skillsToUpdate,
      toDelete: skillsToDelete,
    } = diffById(skills, portfolio.skills);

    const {
      toCreate: experiencesToCreate,
      toUpdate: experiencesToUpdate,
      toDelete: experiencesToDelete,
    } = diffById(experiences, portfolio.experiences);

    const {
      toCreate: educationsToCreate,
      toUpdate: educationsToUpdate,
      toDelete: educationsToDelete,
    } = diffById(educations, portfolio.educations);

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
          experiences: {
            ...(experiencesToCreate.length && {
              create: experiencesToCreate as CreateExperienceDto[],
            }),
            ...(experiencesToUpdate.length && {
              update: experiencesToUpdate?.map((e) => ({
                where: {
                  id: e.id,
                },
                data: e,
              })),
            }),
            ...(experiencesToDelete.length && { delete: experiencesToDelete }),
          },
          educations: {
            ...(educationsToCreate.length && {
              create: educationsToCreate as CreateEducationDto[],
            }),
            ...(educationsToUpdate.length && {
              update: educationsToUpdate?.map((e) => ({
                where: {
                  id: e.id,
                },
                data: e,
              })),
            }),
            ...(educationsToDelete.length && { delete: educationsToDelete }),
          },
        },
        include: {
          projects: true,
          skills: true,
          experiences: true,
          educations: true,
        },
      }),
    );

    const [updatedPortfolio] =
      await this.prismaService.$transaction(transactions);

    return updatedPortfolio;
  }
}
