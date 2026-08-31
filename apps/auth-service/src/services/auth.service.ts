import { AppError } from "shared";
import { createUser, findUserByEmail, findUserById } from "../repositories/user.repo";
import { LoginInput, RegisterInput } from "../schema/auth.schemas";
import  bcrypt  from "bcryptjs";
import { convertToPublicUser } from "../utils/auth.utils";
import { signToken } from "../utils/jwt";

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

export async function login(input : LoginInput) {
    const user = await findUserByEmail(input.email);
    if(!user) {
        throw new AppError(401,"Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password_hash);
    if(!isPasswordValid) {
        throw new AppError(401,"Invalid email or password");
    }


    const token = signToken({userId : user.id,role : user.role})
    return { user: convertToPublicUser(user), token };
}

export async function getMe(userId : string) {
    const user = await findUserById(userId);
    if(!user) {
        throw new AppError(404,"User not found");
    }
    return convertToPublicUser(user);
}
