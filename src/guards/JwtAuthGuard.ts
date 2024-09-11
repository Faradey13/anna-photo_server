import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    console.log('Error:', err);
    console.log('User:', user);
    console.log('Info:', info);
    return super.handleRequest(err, user, info, context);
  }
}