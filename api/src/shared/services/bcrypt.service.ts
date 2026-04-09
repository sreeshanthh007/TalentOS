import bcrypt from "bcrypt";
import { IBcryptService } from "@modules/auth/interfaces/IBcryptService";
import { config } from "@shared/config/env.config";

export class BcryptService implements IBcryptService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, config.SALTROUNDS || 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
