import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Anomaly } from '@interfaces/anomaly.interface';

@Entity('anomaly')
export class AnomalyEntity extends BaseEntity implements Anomaly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean', { name: 'with_anomalies' })
  withAnomalies: boolean;
}
