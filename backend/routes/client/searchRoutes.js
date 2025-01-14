import express from 'express';
const router = express.Router();
import { getTopTrainers, getFilteredTrainers } from "../../controllers/searchController.js";

router.get("/top-trainers", (req, res, next) => { next(); }, getTopTrainers);
router.get("/filter-trainers", (req, res, next) => { console.log("filterSearchRoute"); next() }, getFilteredTrainers);

export default router;
