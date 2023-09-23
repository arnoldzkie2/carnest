import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    userProfile: f({ image: { maxFileSize: "8MB" } })

        .onUploadComplete(async ({ file }) => {

            console.log(file);

        }),

    carImage: f({ image: { maxFileSize: "8MB", maxFileCount: 5 } })

        .onUploadComplete(async ({ file }) => {

            console.log(file);

        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter