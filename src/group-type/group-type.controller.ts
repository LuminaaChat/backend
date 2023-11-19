import { Controller } from '@nestjs/common';
import { GroupTypeService } from './group-type.service';

@Controller('group-type')
export class GroupTypeController {
  constructor(private readonly groupTypeService: GroupTypeService) {}
}
