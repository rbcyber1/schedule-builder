import express from "express";

import {
    getPUSDCredits,
    getCSUCredits,
    getAllClasses,
} from "../controllers/getDB.js";

const router = express.Router();

router.get("/credits/pusd", getPUSDCredits);
router.get("/credits/csu", getCSUCredits);
router.get("/classes", getAllClasses);

export default router;
