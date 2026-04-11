import { ICloudService } from "@modules/auth/interfaces/ICloudservice";
import cloudinary from "@shared/config/cloud.config";



export class CloudinarySignatureService implements ICloudService {

     generateSignature(folder:string): { timestamp: number; signature: string; folder: string; apiKey: string; cloudName: string; } {
        
        const timestamp = Math.floor(Date.now()/1000)

        const signature = cloudinary.utils.api_sign_request({
            timestamp,
            folder
        }, cloudinary.config().api_secret!)

        return {
            timestamp,
            signature,
            folder,
            apiKey: cloudinary.config().api_key!,
            cloudName: cloudinary.config().cloud_name!
        }
    }
}
