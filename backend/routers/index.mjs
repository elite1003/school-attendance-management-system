import express from "express";

const router = express.Router();

router.post("/", postAttendance);
router.get("/:dateId", getOneAttendance);
router.get("/", getAllAttendance);

export default router;
