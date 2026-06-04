import { IsEnum } from 'class-validator';
import { CustomerRole } from '../customer.entity';


export class UpdateRoleDto {
  @IsEnum(CustomerRole, {
    message: 'El rol proporcionado no es válido (debe ser user o admin)',
  })
  role!: CustomerRole;
}