import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from 'node_modules/@nestjs/typeorm';
import { Repository } from 'node_modules/typeorm';
import { Customer } from 'src/customers/customer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customersRepo: Repository<Customer>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.customersRepo.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException();

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new UnauthorizedException();

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { access_token: token };
  }
}