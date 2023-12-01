import { IsNotEmpty, IsString } from 'class-validator';

export class OtpCheckDto {
    @IsString()
    @IsNotEmpty()
    otp: string;
}
