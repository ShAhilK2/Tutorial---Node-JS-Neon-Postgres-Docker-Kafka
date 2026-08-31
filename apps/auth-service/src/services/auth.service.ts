import { AppError } from "shared";
import { createUser, findUserByEmail } from "../repositories/user.repo";
import { RegisterInput } from "../schema/auth.schemas";
import  bcrypt  from "bcryptjs";
import { convertToPublicUser } from "../utils/auth.utils";
export async function register(input : RegisterInput){

    const existing= await findUserByEmail(input.email);
    if(existing){
        throw new AppError(409,"Email already registered");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);


    const user = await createUser({
        email: input.email,
        passwordHash,
        name: input.name,
        role: "USER"
    });

    return convertToPublicUser(user);

    

}