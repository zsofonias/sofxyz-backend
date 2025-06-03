import { Test, TestingModule } from '@nestjs/testing';
import { FindAllPortfolios } from './find-all-portfolios.provider';

describe('FindAllPortfolios', () => {
  let provider: FindAllPortfolios;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllPortfolios],
    }).compile();

    provider = module.get<FindAllPortfolios>(FindAllPortfolios);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
