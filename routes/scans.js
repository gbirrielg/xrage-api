import { Router } from "express";
import { Database } from "../db/queries.js";


const router = Router();
const db = new Database();

router.route("/:handle")
  .all((req, res, next) => {
    req.handle = req.params.handle;
    next();
  })
  .get(async (req, res) => {
    try {
      const userReport = await db.getUserScan(req.handle);
      res.status(200).json(userReport);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      await db.addUserScan(req.handle);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
    try {
      await db.updateUserScan(req.handle, req.body.scanned);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  })


export default router;