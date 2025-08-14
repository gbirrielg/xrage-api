import { Router } from 'express';
import { callScraper } from '../services/scrapeSpawn.js';
import { Database } from '../db/queries.js'
import { gpt } from '../services/gpt.js';


const router = Router();
const db = new Database();

router.get('/:handle', async (req, res) => {
  try {
    const handle = req.params.handle;
    const user = await db.getUser(handle);

    // query db to see if user has been scanned recently
    // if not, scrape user and call GPT
    if (!user) {
      const tweets = await callScraper(handle);
      const report = await gpt(tweets);
      res.status(200).json({
        existed: false,
        scanned: true,
        report: report
      });
      return;
    }

    // if user exists, but query older than 48 hrs, rescan
    const today = new Date();
    const lastScanned = new Date(user.scan_date);
    const timeElapsed = today - lastScanned;
    if (timeElapsed > 1.728e8){
      const tweets = await callScraper(handle);
      const report = await gpt(tweets);
      res.status(200).json({
        existed: true,
        scanned: true,
        report: report
      });
    
    // if user exists and query is fresh, just return cached report
    } else {
      res.status(200).json({
        existed: true,
        scanned: false,
        report: user
      });
    }

  } catch (err) {
    console.error(err)
    res.sendStatus(500);
  }
})


export default router;