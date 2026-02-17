import express from "express";

import {
    addSpecifiedClass,
    addPUSDCreditRequirement,
    addCSUCreditRequirement,
    deleteSpecifiedClass,
    deletePUSDCreditRequirement,
    deleteCSUCreditRequirement,
} from "../controllers/editDB.js";

const router = express.Router();

router.post("/class", addSpecifiedClass);
router.post("/credit/pusd", addPUSDCreditRequirement);
router.post("/credit/csu", addCSUCreditRequirement);
router.delete("/class/:class_id", deleteSpecifiedClass);
router.delete("/credit/pusd/:requirement_name", deletePUSDCreditRequirement);
router.delete("/credit/csu/:requirement_name", deleteCSUCreditRequirement);

export default router;
