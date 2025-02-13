import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Course extends Model<Course> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  CourseId: number;

  @Column({ type: DataType.STRING })
  Title: string;

  @Column({ type: DataType.STRING })
  Description: string;

  @Column({ type: DataType.INTEGER })
  CreatorId: number;

  @Column({ type: DataType.STRING })
  Category: string;

  @Column({ type: DataType.STRING })
  Language: string;

  @Column({ type: DataType.INTEGER })
  Price: number;

  @Column({ type: DataType.STRING })
  Duration: string;

  @Column({ type: DataType.STRING })
  Level: string;

  @Column({ type: DataType.INTEGER })
  Rating: number;

  @Column({ type: DataType.STRING })
  Thumbnail: string;

  @Column({ type: DataType.STRING })
  Status: string;

  @Column({ type: DataType.STRING })
  Tags: string;

  @Column({ type: DataType.DATE })
  PublishedAt: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  IsActive: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE })
  CreatedAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  UpdatedAt: Date;
}
