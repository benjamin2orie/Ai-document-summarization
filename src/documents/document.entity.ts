
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  storagePath: string;

  @Column({ type: 'text' })
  rawText: string;

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  documentType: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;
}
