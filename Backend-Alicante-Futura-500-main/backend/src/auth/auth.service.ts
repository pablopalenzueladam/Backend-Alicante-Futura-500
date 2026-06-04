import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/customers/customer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Customer)
    private customersRepo: Repository<Customer>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.customersRepo.findOne({ where: { email } });

    if (!user) {
      this.logger.warn(`Login fallido: no existe usuario con email "${email}"`);
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Diagnóstico: detecta si la contraseña almacenada no está hasheada con bcrypt
    const looksHashed = user.password?.startsWith('$2b$') || user.password?.startsWith('$2a$');
    if (!looksHashed) {
      this.logger.error(
        `PROBLEMA DE REGISTRO: el usuario "${email}" tiene la contraseña almacenada en texto plano o con formato incorrecto. ` +
        `Revisa el endpoint de registro — la contraseña debe hashearse con bcrypt antes de guardarse.`
      );
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      this.logger.warn(`Login fallido: contraseña incorrecta para el usuario "${email}"`);
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    this.logger.log(`Login correcto para el usuario "${email}" (id: ${user.id})`);

    return { access_token: token };
  }
}
