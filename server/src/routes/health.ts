import Express from "express";

import { getDBHealth } from "../controllers/health.js";

const router = Express.Router();

router.post("/db", getDBHealth);

export default router;
