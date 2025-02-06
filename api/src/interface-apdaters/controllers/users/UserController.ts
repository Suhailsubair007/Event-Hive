// src/interface-adapters/controllers/UserController.ts
import { Request, Response } from "express";
import { RegisterUser } from "../../../use-cases/user/Auth/RegisterUser";
import { Iuser } from "../../../entities/models/User";
import {RegisterUserDTO} from "../../../shared/dto/UserDto"


export class UserController {
  constructor(private registerUser: RegisterUser) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password } = req.body;
      const userData: RegisterUserDTO = { name, email, phone, password};

      const user = await this.registerUser.execute(userData);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
      if (error.message === "User already exists") {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  }
}