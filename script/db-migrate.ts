import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { closePool, getPool } from "../packages/shared/db/pool.js";



config({path : resolve(process.cwd(), ".env")})



async function main(){

    const file = process.argv[2] ?? "001_users.sql";

    const sql = readFileSync(resolve(process.cwd(), file), "utf-8");


    const pool = getPool()
    
    await pool.query(sql)


    console.log(`Migrate ${file}`)

    await closePool()

    

}


main().catch((error) => {
    console.error("Migration failed", error);
    process.exit(1);
})