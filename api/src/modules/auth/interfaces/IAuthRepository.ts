import { User } from '@modules/auth/models/user.model';
import { RegisterInputDTO } from '@modules/auth/dtos/auth.dto';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: RegisterInputDTO): Promise<User>;
}
