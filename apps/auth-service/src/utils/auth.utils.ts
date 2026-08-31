import { User } from "../types/auth.types";

export function convertToPublicUser(user : User) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at,
    };
}

