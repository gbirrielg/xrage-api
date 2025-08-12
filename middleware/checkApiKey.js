import dotenv from "dotenv";
dotenv.config();

export function checkApiKey(req, res, next) {
  try {
    const key = req.header('authorization').split(' ')[1];
    if (key !== process.env.XSCANNER_API_KEY) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  next();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Erorr'});
  }
}