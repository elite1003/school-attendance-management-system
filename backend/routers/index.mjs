import express from "express";
import {
  getAllStudents,
  getOneAttendance,
  getAllAttendance,
  postAttendance,
} from "../controllers/index.mjs";
const router = express.Router();

router.post("/attendance", postAttendance);
router.get("/attendance/:date", getOneAttendance);
router.get("/attendance", getAllAttendance);
router.get("/student", getAllStudents);
export default router;
