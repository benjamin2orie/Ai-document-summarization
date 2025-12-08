


// documents/docs/swagger.ts
import { applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';

export const DocumentsSwagger = {
  tags: () => ApiTags('documents'),
  upload: () =>
    applyDecorators(
      ApiConsumes('multipart/form-data'),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: { type: 'string', format: 'binary' },
          },
        },
      }),
    ),
};

