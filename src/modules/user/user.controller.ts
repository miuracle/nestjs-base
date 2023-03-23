import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UserResult } from './dto/user.dto';
import { AppResponse, SwaggerApiAppResponse } from '@constants/app-response';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @SwaggerApiAppResponse(UserResult)
  async createUser(@Body() data: CreateUserDto) {
    const user = await this.userService.test(data);

    return AppResponse.success(user, UserResult);
  }
}
