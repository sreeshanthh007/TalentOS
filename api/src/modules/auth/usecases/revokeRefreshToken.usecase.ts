import { RedisClient } from "@shared/config/redis.config";


export class RevokeRefreshTokenUseCase {

    constructor(){}


    async execute (token:string) : Promise<void>{

        await RedisClient.del(`refresh:${token}`);
    }
}