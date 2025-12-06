import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { StorageModule } from './storage/storage.module';
import { TextExtractionModule } from './text-extraction/text-extraction.module';
import { AnalysisModule } from './analysis/analysis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/config';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true, 
      load:[configuration]
    }),

      TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: String(config.get<string>('DB_PASS') || 'postgres'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    DocumentsModule,
    StorageModule, 
    TextExtractionModule,
    AnalysisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
