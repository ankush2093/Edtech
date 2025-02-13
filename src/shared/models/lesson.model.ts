import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  import { Course } from './course.model';
  
  @Table({ tableName: 'Lesson', timestamps: true })
  export class Lesson extends Model<Lesson> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    LessonId: number;
  
    @ForeignKey(() => Course)
    @Column({ type: DataType.INTEGER })
    CourseId: number;
  
    @Column({ type: DataType.STRING })
    Title: string;
  
    @Column({ type: DataType.TEXT }) // For Markdown/HTML content
    Content: string;
  
    @Column({ type: DataType.JSON })
    TestCases: object;
  
    @Column({ type: DataType.INTEGER })
    Order: number;
    
    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    IsActive: boolean;
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    CreatedAt: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    UpdatedAt: Date;
  }
  