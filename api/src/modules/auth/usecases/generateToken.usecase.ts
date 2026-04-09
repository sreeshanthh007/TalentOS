import { RedisClient } from "@shared/config/redis.config";
import { ITokenService } from "../interfaces/ITokenService";
import { UserRole } from "@shared/types/database.types";

export class generateAccessTokenUsecase {
    constructor(private readonly tokenService: ITokenService) {}

    async execute(id: string, email: string, role: string): Promise<{accessToken: string, refreshToken: string}> {
        const payload = { 
            id, 
            email, 
            role: role as UserRole 
        };

        const accessToken = this.tokenService.generateAccessToken(payload);
        const refreshToken = this.tokenService.generateRefreshToken(payload);

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const ttl = Math.floor((expiresAt.getTime() - Date.now()) / 1000);

        await RedisClient.hSet(`refresh:${refreshToken}`, {
            userType: role,
            user: id.toString()
        });

        await RedisClient.expire(`refresh:${refreshToken}`, ttl);
         
        return { accessToken, refreshToken };
    }
}