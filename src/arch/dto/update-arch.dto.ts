import { PartialType } from '@nestjs/mapped-types';
import { CreateArchDto } from './create-arch.dto';

export class UpdateArchDto extends PartialType(CreateArchDto) {}
