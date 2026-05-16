/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // ✅ CREATE ADMIN
  @Post("create-admin")
  createAdmin(@Body() body: any) {
    return this.authService.createAdmin(body);
  }

  // ✅ LOGIN
  @Post("login")
  login(@Body() body: any) {
    return this.authService.login(
      body.email,
      body.password,
    );
  }
}

