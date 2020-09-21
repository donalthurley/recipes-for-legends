// import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    private recipesURL = 'https://recipebook-531d1.firebaseio.com/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http.put(this.recipesURL, recipes)
        .subscribe(
          (response) => {
            console.log(response);
          }
        )
    }

    fetchRecipes() {
      return this.http.get<Recipe[]>(this.recipesURL)
        .pipe(
          map(
            recipes => {
              return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients?recipe.ingredients:[]};
              })
            }
          ),
          tap(recipes => {
            console.log(recipes);
            this.recipeService.setRecipes(recipes);
          })
        )
    }

    //   return this.authService.user.pipe(
    //     take(1),
    //     exhaustMap(user => {
    //       console.log("Exhausted: " + user);
    //       return this.http.get<Recipe[]>(this.recipesURL,
    //         {
    //           params: new HttpParams().set('auth', user.token)
    //         }
    //       );
    //     }),
    //     map(
    //       recipes => {
    //         return recipes.map(recipe => {
    //           return {...recipe, ingredients: recipe.ingredients?recipe.ingredients:[]};
    //         })
    //       }
    //     ),
    //     tap(recipes => {
    //       console.log(recipes);
    //       this.recipeService.setRecipes(recipes);
    //     }
    //   ));
    // }
}
