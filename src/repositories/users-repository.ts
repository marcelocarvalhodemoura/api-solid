import { User } from "@prisma/client";

export interface UsersRepository {
    create: (data: { password_hash: string; name: string; email: string }) => Promise<User>
    findByEmail: (email: string) => Promise<User | null>
    findById: (id: string) => Promise<User | null>
}