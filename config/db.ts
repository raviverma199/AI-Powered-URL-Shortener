import { Pool } from "pg";

const connection = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  database: "url_shortener",
  port: 2000,
  max: 20,
});

const ExecuteQuery = async (query: string, values: any[]): Promise<any> => {
  const client = await connection.connect();
  try {
    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};

export default ExecuteQuery;
