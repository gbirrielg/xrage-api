import { Router } from 'express';
import { callScraper } from '../services/scrapeSpawn.js';
import { Database } from '../db/queries.js'
import { gpt } from '../services/gpt.js';


const router = Router();
const db = new Database();

router.get('/:handle', async (req, res) => {
  try {
    const handle = req.params.handle;

    let user = await db.getUser(handle);
    if (!user) {
      const tweets = await callScraper(handle);
      const report = await gpt(tweets);
      res.json(report);
    } else {
      res.json(user);
    }

  } catch (err) {
    console.error(err)
  }
})


export default router;