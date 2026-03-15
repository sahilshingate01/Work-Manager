// Vercel Serverless Function entry point.
// Vercel will expose this file as the handler for all /api/* routes.
// We simply re-export the existing Express app — no logic changes needed.

import app from "../projects/work-manager-api-server/src/app.js";

export default app;
