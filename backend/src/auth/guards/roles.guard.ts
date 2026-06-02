// src/auth/guards/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CustomerRole } from '../../customers/customer.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Leer los roles requeridos por el endpoint actual
    const requiredRoles = this.reflector.getAllAndOverride<CustomerRole[]>(ROLES_KEY, [
      context.getHandler(), 
      context.getClass(),  
    ]);

    // Si la ruta no tiene el decorador @Roles, es de acceso libre para cualquier rol. Pasamos.
    if (!requiredRoles) {
      return true;
    }

    // 2. Obtener la petición HTTP y extraer el usuario
    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    // Seguridad: Si no hay usuario en la petición o no tiene rol, bloqueamos de inmediato
    if (!user || !user.role) {
      return false;
    }

    // 3. Evaluar: ¿El rol del usuario está dentro de los roles permitidos?
    // Devuelve true (pasa) o false (bloqueado con un error 403 Forbidden)
    return requiredRoles.includes(user.role);
  }
}