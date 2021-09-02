import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository 
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto
        const user = await this.userRepository.findOne({ username })

        if(user && (await bcrypt.compare(password, user.password))) {
            return 'login success'
        } else {
            throw new UnauthorizedException(`login failed`)
        }
    }
}
