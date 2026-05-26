import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "node_modules/@nestjs/typeorm";
import { Customer } from "src/customers/customer.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}