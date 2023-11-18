import { Test, TestingModule } from '@nestjs/testing';
import { ArchController } from './arch.controller';
import { ArchService } from './arch.service';

describe('ArchController', () => {
    let controller: ArchController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArchController],
            providers: [ArchService],
        }).compile();

        controller = module.get<ArchController>(ArchController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
