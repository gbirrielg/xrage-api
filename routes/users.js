import { Router } from "express";
import { Database } from "../db/queries.js";


const router = Router();
const db = new Database();

router.post('/:handle', async (req, res) => {
  const handle = req.params.handle;
  const report = req.body.report;

  try {
    await db.addUser(handle, report);
    res.sendStatus(204);
  } catch (err){
    console.error(err)
    res.sendStatus(500)
  }
})


router.put('/:handle', async (req, res) => {
  const handle = req.params.handle;
  const report = req.body.report;
  console.log(report);

  try {
    await db.updateUser(handle, report);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500)
  }
})

export default router;