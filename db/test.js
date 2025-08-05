import { Database } from "./queries.js";

const report = {
  political: 1,
  insult: 2,
  threat: 3,
  profanity: 4,
  toxicity: 5,
  overall_report: "THIS IS A TEST USER",
  risk_level: 3,
};

const updated_report = {
  political: 10,
  insult: 10,
  threat: 10,
  profanity: 10,
  toxicity: 10,
  overall_report: "THIS IS A TEST USER AFTER UPDATE",
  risk_level: 10,
}

const HANDLE = "@test0"


const db = new Database();

async function runTests() {
  // testing adding user to users table, expected to fail if user already exists
  await db.addUser(HANDLE, report);

  // testing adding user to scans table, expected to fail if user already exists
  await db.addUserScan(HANDLE);
  
  // testing querying for user in users table
  const resUser = await db.getUser(HANDLE);
  console.log(resUser);

  // testing querying for user in scans table
  const resScan = await db.getUserScan(HANDLE);
  console.log(resScan);

  // testing updating a user in users table
  await db.updateUser(HANDLE, updated_report);

  // testing updating a user in scans table
  await db.updateUserScan(HANDLE, true);
}

runTests();

