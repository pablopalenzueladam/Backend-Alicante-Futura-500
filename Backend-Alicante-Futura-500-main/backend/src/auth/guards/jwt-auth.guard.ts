import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // 1. Extraer el token de la cabecera Authorization (Format: Bearer TOKEN)
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];

    try {
      // 2. Verificar el token usando tu 'SECRET_KEY'
      // jwtService sabe usar la clave secreta automáticamente si el módulo está bien proveído
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'SECRET_KEY', // Debe ser la misma de tu AuthModule
      });

      // 3. ¡La clave del éxito! Insertamos el usuario descifrado en la petición.
      // Asegúrate de que cuando generas el JWT en tu AuthService, incluyas el 'role' en el payload.
      request['user'] = payload; 
      
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}