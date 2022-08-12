import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from '../../src/planets/planets.controller';
import { PlanetsService } from '../../src/planets/planets.service';

describe('PlanetsController', () => {
  let controller: PlanetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [PlanetsService],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
