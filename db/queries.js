import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();


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
    }
  }


  async updateUser(handle, report) {
    const client = await this.pool.connect();
    const text = `UPDATE users
      SET scan_date = $1, political = $2, insult = $3, threat = $4
      , profanity = $5, toxicity = $6, report = $7, risk_level = $8
      WHERE handle = $9`;
    const today = new Date().toISOString().split("T")[0];
    const values = [
      today,
      report.political,
      report.insult,
      report.threat,
      report.profanity,
      report.toxicity,
      report.overall_report,
      report.risk_level,
      handle,
    ];

    try {
      await client.query(text, values);
      console.log(`UPDATE: ${handle} has been updated on users`);
    } catch (err) {
      console.error("updateUser() FAILED: ", err);
    }
  }


  async updateUserScan(handle, status) {
    const client = await this.pool.connect();
    const text = `UPDATE scans
      SET passed_scans = passed_scans + $1, failed_scans = failed_scans + $2
      , total = total + 1
      WHERE handle = $3`;
    const values = status ? [1, 0] : [0, 1]; // if true, then scan passed
    values.push(handle);

    try {
      await client.query(text, values);
      console.log(`UDPATE: ${handle} has been updated on scans`);
    } catch (err) {
      console.error("updateUserScan() FAILED: ", err);
    }
  }


  async getUser(handle) {
    const client = await this.pool.connect();
    const text = `SELECT * FROM users
      WHERE handle = ($1)`;
    const values = [handle];

    try {
      const res = await client.query(text, values);
      console.log(`GET: ${handle} was looked up on users`);
      return res.rows[0];
    } catch (err) {
      console.error("getUser() FAILED: ", err);
    }
  }


  async getUserScan(handle) {
    const client = await this.pool.connect();
    const text = `SELECT * FROM scans
      WHERE handle = ($1)`;
    const values = [handle];

    try {
      const res = await client.query(text, values);
      console.log(`GET: ${handle} was looked up on scans`);
      return res.rows[0];
    } catch (err) {
      console.error("getUserScan() FAILED: ", err);
    }
  }

}
