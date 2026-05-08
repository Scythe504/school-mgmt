import { application, Router } from "express";
import { addSchool } from "../controllers/addSchool.js";
import { listSchools } from "../controllers/listSchool.js";

const router = Router()

router.post("/addSchool", addSchool)
router.get("/listSchools", listSchools)

export default router;