import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Game } from '../interfaces/games.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'https://www.freetogame.com/api';
  constructor(private http: HttpClient) {}

  //función que se utiliza para obtener una lista de games desde una API
  getGameList(limit: number = 5, offset: number = 0): Observable<{ games: Game[], total: number }> {
    
    return this.http.get<Game[]>(`${this.apiUrl}/games`).pipe(
      map((response) => {
        // Aplicamos paginación local ya que la API no admite parámetros `limit` ni `offset`
        const paginatedGames = response.slice(offset, offset + limit); 
        return {
          games: paginatedGames,
          total: response.length, // Total es simplemente el tamaño de la respuesta completa.
        };
      })
    );
  }
  
  
  
  // Obtener juegos filtrados por categoría
  getGamesByCategory(category: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games?category=${category}`);
  }

  // Obtener detalles de un juego específico
  getGameDetails(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/game?id=${id}`);
  }
  
}
