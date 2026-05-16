/* eslint-disable prettier/prettier */

import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { Admin } from "../schema/admin.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,
  ) {}

  // ✅ CREATE ADMIN
  async createAdmin(body: any) {
    const admin = new this.adminModel(body);

    return admin.save();
  }

  // ✅ LOGIN
  async login(
    email: string,
    password: string,
  ) {
    // 👑 CHECK ADMIN
    const admin =
      await this.adminModel.findOne({
        email,
      });

    // 👑 ADMIN LOGIN
    if (admin) {
      if (admin.password !== password) {
        throw new UnauthorizedException(
          "Invalid credentials",
        );
      }

      return {
        success: true,
        role: "admin",
        email: admin.email,
        token: "admin-token",
      };
    }

    // 👤 SIMPLE USER LOGIN
    return {
      success: true,
      role: "user",
      email,
      token: "user-token",
    };
  }
}