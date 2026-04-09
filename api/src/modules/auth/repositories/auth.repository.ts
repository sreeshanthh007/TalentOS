import { IAuthRepository } from '@modules/auth/interfaces/IAuthRepository';
import { User } from '@modules/auth/models/user.model';
import { RegisterInputDTO } from '@modules/auth/dtos/auth.dto';

export class AuthRepository implements IAuthRepository {
  constructor() {
    // DB connection inject if needed manually
  }

  async findByEmail(email: string): Promise<User | null> {
    // TODO: DB lookup logic
    return null;
  }

  async findById(id: string): Promise<User | null> {
    // TODO: DB lookup logic
    return null;
  }

  async create(data: RegisterInputDTO): Promise<User> {
    // TODO: DB create logic
    // return {
    //   id: 'dummy-id',
    //   email: data.email,
    //   role: data.role,
    //   password: data.password,
    //   createdAt: new Date()
    // } as User;
    throw new Error('Method not implemented.');
  }
}
