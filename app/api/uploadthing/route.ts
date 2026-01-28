import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Use the default dynamic behavior so UploadThing
// can handle streaming uploads correctly.
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

