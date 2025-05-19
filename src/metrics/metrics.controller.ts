import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('api/metrics')
export class MetricsController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  getUserMetrics() {
    return this.usersService.getUserMetrics();
  }
}
