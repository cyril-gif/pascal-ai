import bcrypt from "bcrypt";
import User from "../../models/user.model";
import { generateToken } from "../../utils/generateToken";

export class AuthService {
  async register(data: any) {
    const existingUser = await User.findOne({
      $or: [
        { email: data.email },
        { username: data.username }
      ]
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const token = generateToken(
      user._id.toString(),
      user.email,
      user.role
    );

    return {
      token,
      user,
    };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(
      user._id.toString(),
      user.email,
      user.role
    );

    return {
      token,
      user,
    };
  }
}