import { Test, TestingModule } from '@nestjs/testing';
import { ArchService } from './arch.service';

describe('ArchService', () => {
    let service: ArchService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArchService],
        }).compile();

        service = module.get<ArchService>(ArchService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
