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
const db = new Database();

async function runTests() {
  try {
    await db.addUser("@test0", report);
    console.log("SUCCESS: addUser()");
  } catch (err) {
    console.error("FAIL: addUser(): ", err);
  }

  try {
    await db.getUser("@test0");
    console.log("SUCCESS: getUser()");
  } catch (err) {
    console.error("FAIL: getUser(): ", err);
  }
}

runTests();
