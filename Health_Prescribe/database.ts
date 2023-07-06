import { Pool } from 'pg';

export class Database {
private pool: Pool;
private readonly config = {
    user: 'postgres',
    password: '123456789',
    host: 'localhost',
    port: 5432, // Puerto por defecto de PostgreSQL
    database: 'health_prescribe',
};

constructor() {
    this.pool = new Pool(this.config);
}

async query(text: string, values?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
    const result = await client.query(text, values);
    return result.rows;
    } finally {
    client.release();
    }
}
}
