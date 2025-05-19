import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, 
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    const user = this.userRepository.create(createUserDto);

    
    await this.userRepository.save(user);

    
    return user;
  }


  findAll() {
    return this.userRepository.find();
  }

  
  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: +id } });
    return user;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      
      Object.assign(user, updateUserDto);
      await this.userRepository.save(user);
      return user;
    }
    return null; 
  }


  async getUserMetrics() {
    const total = await this.userRepository.count();
    const active = await this.userRepository.count({ where: { isApproved: true } });
    const inactive = await this.userRepository.count({ where: { isApproved: false } });
    return { total, active, inactive };
  }

 
  async getAllUsers(startDate?: string, endDate?: string, page = 1, limit = 10) {
    const query = this.userRepository.createQueryBuilder('user');

    if (startDate && endDate) {
      query.where('user.createdAt BETWEEN :start AND :end', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
    }

    query.skip((page - 1) * limit).take(limit);

    const users = await query.getMany();
    return users.map(user => ({
      fullName: user.fullName,
      status: user.isApproved ? 'Active' : 'Inactive',
      registeredDate: user.createdAt,
    }));
  }

 
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
