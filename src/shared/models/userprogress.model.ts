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
  import { Lesson } from './lesson.model';
  import { User } from './user.model'; 
  
  @Table({timestamps: true})
  export class UserProgress extends Model<UserProgress> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    ProgressId: number;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    UserId: number;
  
    @ForeignKey(() => Course)
    @Column({ type: DataType.INTEGER })
    CourseId: number;
  
    @ForeignKey(() => Lesson)
    @Column({ type: DataType.INTEGER })
    LessonId: number;
  
    @Column({ type: DataType.FLOAT })
    Score: number;
  
    @Column({ type: DataType.DATE, allowNull: true })
    CompletedAt: Date;
    
    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    IsActive: boolean;
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    CreatedAt: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    UpdatedAt: Date;
  }
  