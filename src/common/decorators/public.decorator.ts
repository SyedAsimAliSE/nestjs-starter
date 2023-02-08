import { SetMetadata } from '@nestjs/common';

export const Public = (isPublic) => SetMetadata('isPublic', isPublic);
