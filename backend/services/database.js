import {Pool} from "pg"

const DBSERVER=process.env.DB_SERVER
const DBUSER=process.env.DB_USER
const DBPWD=process.env.DB_PWD
const DBHOST=process.env.DB_HOST
const DBPORT=process.env.DB_PORT
const DBNAME=process.env.DB_NAME

const db = new Pool({
    connectionString:`${DBSERVER}://${DBUSER}:${encodeURIComponent(DBPWD)}@${DBHOST}:${DBPORT}/${DBNAME}`
})

// Check database connection
async function test() {
  try {
    const client = await db.connect();
    console.log("✅ Database connected successfully");
    client.release();
  } catch (err) {
    console.log(DBSERVER,DBUSER,DBPWD,DBHOST,DBPORT,DBNAME)
    console.error("❌ Database connection failed:", err.message)
  }
};

test()

export default db