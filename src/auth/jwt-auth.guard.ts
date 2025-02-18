import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    console.log('Auth Header:', authHeader); // Debug log

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No token provided!');
      throw new ForbiddenException('Toke Invalied'); // 403 Error
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      console.log('✅ Decoded Token:', decoded);
      request.user = decoded;
      return true;
    } catch (err) {
      console.log('❌ Token verification failed:', err.message);
      throw new UnauthorizedException('Invalid token'); // 401 Error
    }
  }
}
