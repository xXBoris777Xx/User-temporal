import { Injectable, NotFoundException } from '@nestjs/common';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

@Injectable()
export class UsersService {
  private usuarios: Usuario[] = [];
  private siguienteId = 1;

  crear(nombre: string, email: string, edad: number): Usuario {
    const usuario: Usuario = { id: this.siguienteId++, nombre, email, edad };
    this.usuarios.push(usuario);
    return usuario;
  }

  obtenerTodos(): Usuario[] {
    return this.usuarios;
  }

  obtenerUno(id: number): Usuario {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  eliminar(id: number): { mensaje: string } {
    const indice = this.usuarios.findIndex((u) => u.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    this.usuarios.splice(indice, 1);
    return { mensaje: `Usuario ${id} eliminado` };
  }
}
