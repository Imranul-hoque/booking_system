import { getUserSession } from "@/actions/current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = async () => { 
    const currentuser = await getUserSession();

    if (!currentuser) {
        throw new Error("unauthorized user")
    }
    return { id : currentuser.id }
}
export const ourFileRouter = {

    imageUpload: f({ image: { maxFileCount: 1, maxFileSize : '8MB' } })
    .middleware(auth)
    .onUploadComplete(() => {})

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
