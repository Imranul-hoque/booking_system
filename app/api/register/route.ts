import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
export async function POST(
    req: Request
) {
    try {

        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
          return new NextResponse("All fields are required", { status: 400 });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await prismadb.user.create({
          data: {
            name: name,
            email: email,
            hashedPassword: hashedpassword,
          },
        });

        return NextResponse.json(user);
        
    } catch (error:any) {
        return new NextResponse(error, { status : 500 })
    }
} 