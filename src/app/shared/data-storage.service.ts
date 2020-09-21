// import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, tap } from 'rxjs/operators'

@Injectable()
export class DataStorageService {
    private recipesURL = 'https://recipebook-531d1.firebaseio.com/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService) {}
        // private authService: AuthService) {}

    storeRecipes() {
        // const token = this.authService.getToken();
        // return this.http.put(this.recipesURL + '?auth=' + token, this.recipeService.getRecipes());
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.recipesURL, recipes)
          .subscribe(
            (response) => {
              console.log(response);
            }
          )
    }

    fetchRecipes() {
        // const token = this.authService.getToken();
        // this.http.get(this.recipesURL + '?auth=' + token)
        return this.http.get<Recipe[]>(this.recipesURL)
          .pipe(map(
            recipes => {
              return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients?recipe.ingredients:[]};
              })
            }
          ),
          tap(recipes => {
            console.log(recipes);
            this.recipeService.setRecipes(recipes);
          }

          ));
    }
}
