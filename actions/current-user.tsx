import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismadb } from "@/lib/prismadb";
import { getServerSession } from 'next-auth/next'

const getSession = async () => {
    return await getServerSession(authOptions)
};

export const getUserSession = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
        return null
    }

    const user = await prismadb.user.findUnique({
        where: {
            email: session.user.email as string
        }
    });

    if (!user) {
        throw new Error("Login Required")
    }

    return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        emailVerified : user.emailVerified?.toISOString() || null
    }
}