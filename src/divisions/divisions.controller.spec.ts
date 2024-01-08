import { Test, TestingModule } from '@nestjs/testing';
import { DivisionsController } from './divisions.controller';
import { DivisionsService } from './divisions.service';

describe('DivisionsController', () => {
    let controller: DivisionsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DivisionsController],
            providers: [DivisionsService],
        }).compile();

        controller = module.get<DivisionsController>(DivisionsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
