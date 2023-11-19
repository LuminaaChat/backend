import { Test, TestingModule } from '@nestjs/testing';
import { GroupChatsService } from './group-chats.service';

describe('GroupChatsService', () => {
  let service: GroupChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupChatsService],
    }).compile();

    service = module.get<GroupChatsService>(GroupChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
