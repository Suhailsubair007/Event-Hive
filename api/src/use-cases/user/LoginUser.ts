import { UserModal } from "../../entities/User";

export class LoginUser {
    async execute(email: string, password: string): Promise<boolean> {
        const user = await UserModal.findOne({ email, password });
        return !!user;
    }
}

///commenteddddd
//suhail    COMENTS