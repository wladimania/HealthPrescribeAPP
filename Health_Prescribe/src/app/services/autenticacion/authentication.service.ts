import { Injectable } from '@angular/core';
import { Pool, Client } from 'pg';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private pool: Pool;

  constructor() {
    // Configuración de la conexión a la base de datos
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'health_prescribe',
      password: '123456789',
      port: 5432
    });
  }

  async authenticateUser(username: string, password: string): Promise<boolean> {
    const client = await this.pool.connect();

    try {
      // Consulta para buscar al usuario en la base de datos
      const query = 'SELECT * FROM usuarios WHERE user = $1 AND pass = $2';
      const values = [username, password];
      const result = await client.query(query, values);

      // Verificar si se encontró un usuario válido
      if (result.rowCount === 1) {
        return true; // Autenticación exitosa
      } else {
        return false; // Autenticación fallida
      }
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      return false; // Autenticación fallida
    } finally {
      client.release();
    }
  }
}
