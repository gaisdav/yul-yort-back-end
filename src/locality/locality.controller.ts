import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { Locality_NOT_FOUND } from './locality.constants';
import { LocalityModel } from './locality.model';
import { LocalityService } from './locality.service';

@Controller('locality')
export class LocalityController {

  constructor(private readonly localityService: LocalityService) {
    // console.log(ConfigService)
  }

  @Post('create') 
  async create(@Body() dto: CreateLocalityDto) {
    return this.localityService.create(dto)
  }

  @Get()
  async get(@Param('id') id:string) {

  }

  @Delete(':id')
  async delete(@Param('id') id:string) {
    const deleteDoc = await this.localityService.delete(id)
    if(!deleteDoc) {
      throw new HttpException(Locality_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch(@Param('id') id:string, @Body() dto: LocalityModel) {

  }

  //TODO: test
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test() {
    console.log('test')
    return '11234'
  }
}
