import {
  BaseEntity,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';

// Define a generic abstract class for CRUD operations
@Injectable()
export abstract class CrudService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne(options);
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const dateNow: string = dayjs().utcOffset(7).format('YYYY-MM-DD HH:mm:ss');
    (entity as any).is_deleted = false;
    (entity as any).created = dateNow;
    (entity as any).modified = dateNow;
    const createdEntity = this.repository.create(entity);
    return await this.repository.save(createdEntity);
  }

  async update(id: number, entity: DeepPartial<T>): Promise<T> {
    try {
      const data = await this.repository.findOneById(id);
      const dateNow: string = dayjs()
        .utcOffset(7)
        .format('YYYY-MM-DD HH:mm:ss');
      (entity as any).modified = dateNow;
      
      if (!data) {
        throw new HttpException(
          {
            error_code: 4040,
            message_code: 'memberNotFound',
          },
          404,
        );
      }
      
      const updatedMember = await this.repository.save({
        ...data,
        ...entity,
      });
      return updatedMember;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          error_code: 5000,
          message_code: 'interServerError',
        },
        500,
      );
    }
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }

  async softDelete(id: number) {
    const data = await this.repository.findOneById(id);
    (data as any).is_deleted = true;
    const updatedMember = await this.repository.save(data);
    return updatedMember;
  }
  
}
