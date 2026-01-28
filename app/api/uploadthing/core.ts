import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // UploadThing only allows specific size presets; "4MB" is the closest to our 5MB client limit.
  paymentScreenshot: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // No auth / extra metadata needed for now
    .middleware(() => ({}))
    .onUploadComplete(({ file }) => {
      console.log("Upload complete for paymentScreenshot:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

