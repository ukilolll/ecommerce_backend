import { createClient } from "redis";

const redis = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
async function test() {
  try{
      redis.connect().catch(console.error);
      console.log("✅ redis connected successfully");
  }
  catch(err){
      console.error("❌ redis connection failed:", err.message)
  }
}

test()

export default redis
