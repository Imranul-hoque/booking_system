import { getUserSession } from '@/actions/current-user';
import { prismadb } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(
    req: Request,
    { params } : { params : { listingId : string } }
) {
    
    const currentUser = await getUserSession();
    const { listingId } = params;

    if (!currentUser) {
        return new NextResponse("unAothorized user");
    }
    let favoritesIds = [...(currentUser.favoriteIds || [])]
    favoritesIds = favoritesIds.filter(id => id !== listingId)

    const user = await prismadb.user.update({
        where: {
            id : currentUser.id
        },
        data: {
            favoriteIds : favoritesIds
        }
    })

    return NextResponse.json(user)
}

export async function POST(
    req: Request,
    { params } : { params : { listingId : string } }
) {

    const currentUser = await getUserSession();

    if (!currentUser) {
        return NextResponse.error()
    }
    const { listingId } = params;

    const favoriteIds = [...(currentUser.favoriteIds || [])]
    favoriteIds.push(listingId);
    const user = await prismadb.user.update({
        where: {
            id : currentUser.id
        },
        data: {
            favoriteIds : favoriteIds
        }
    })
    return NextResponse.json(user)
}