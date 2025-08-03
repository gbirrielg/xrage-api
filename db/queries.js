import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

/*REQ FUNCS
- Add user to users table
- Add user to scans table
- UPDATE user on user table
- UPDATE user on scans table
- QUERY user on user table (not req'ed for scans)
*/

export class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DB_EXTERN_URL,
      ssl: { rejectUnauthorized: false },
    });
  }


  async addUser(handle, report) {
    const client = await this.pool.connect();
    const text = `INSERT INTO users 
      (handle, scan_date, political, insult, threat, profanity, toxicity, report, risk_level) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const today = new Date().toISOString().split("T")[0];
    const values = [
      handle,
      today,
      report.political,
      report.insult,
      report.threat,
      report.profanity,
      report.toxicity,
      report.overall_report,
      report.risk_level,
    ];

    try {
      await client.query(text, values);
      console.log(`INSERT: ${handle} added to users`);
    } catch (err) {
      console.error("addUser() FAILED: ", err);
      throw err;
    }
  }


  async addUserScan(handle) {
    const client = await this.pool.connect();
    const text = `INSERT INTO scans 
      (handle) VALUES ($1)`;
    const values = [handle];

    try {
      await client.query(text, values);
      console.log(`INSERT: ${handle} added to scans`);
    } catch (err) {
      console.error("adduserScan() FAILED: ", err);
      throw err;
    }
  }


  async getUser(handle) {
    const client = await this.pool.connect();
    const text = `SELECT * FROM users
      WHERE handle = ($1)`;
    const values = [handle];

    try {
      const res = await client.query(text, values);
      console.log(`GET: ${handle} was looked up`);
      return res.rows[0];
    } catch (err) {
      console.error("getUser() FAILED: ", err);
      throw err;
    }
  }

}
