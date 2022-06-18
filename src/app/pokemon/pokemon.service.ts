import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {
  private url = 'api/pokemons/'
  constructor( private http: HttpClient) {

  }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url).pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => {
        console.table(error);
        return of([]);
      })
    )
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`${this.url}${pokemonId}`).pipe(
      tap((response) =>this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.url,pokemon,httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  }

  private log(response: any) {
    console.table(response)
  }

  private handleError(error: Error, erorValue: any) {
    console.error(error);
    return of(erorValue);

  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }

}
