import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Header,
  HttpCode,
  Options,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from './users.service';

export interface CrearUsuarioBody {
  nombre: string;
  email: string;
  edad: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Head()
  contarUsuarios(@Res({ passthrough: true }) res: Response) {
    const total = this.usersService.obtenerTodos().length;
    res.setHeader('X-Total-Count', String(total));
  }

  @Head(':id')
  verificarUsuario(@Param('id', ParseIntPipe) id: number) {
    this.usersService.obtenerUno(id);
  }

  @Options()
  @Header('Allow', 'GET, HEAD, POST, OPTIONS')
  @HttpCode(204)
  opcionesUsuarios() {}

  @Options(':id')
  @Header('Allow', 'GET, HEAD, DELETE, OPTIONS')
  @HttpCode(204)
  opcionesUsuario() {}

  @Get()
  obtenerTodos() {
    return this.usersService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.obtenerUno(id);
  }

  @Post()
  crear(@Body() body: CrearUsuarioBody) {
    if (!body.nombre || !body.email || typeof body.edad !== 'number') {
      throw new BadRequestException(
        'Se requieren: nombre (texto), email (texto) y edad (número)',
      );
    }
    return this.usersService.crear(body.nombre, body.email, body.edad);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.eliminar(id);
  }
}