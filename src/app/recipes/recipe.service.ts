
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //   new Recipe(
    //     'Schnitzel',
    //     'A super-tasty Schnitzel!',
    //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //     [
    //       new Ingredient('Meet', 1),
    //       new Ingredient('French Fries', 20)
    //     ]
    //   ),
    //   new Recipe(
    //     'Big Fat Burger',
    //     'What else you need to say?',
    //     'https://www.seriouseats.com/images/2015/06/20150612-vegetarian-burger-recap-04.jpg',
    //     [
    //       new Ingredient('Buns', 2),
    //       new Ingredient('Meat', 20)
    //     ]
    //   )
    // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
      // tslint:disable-next-line:max-line-length
      return this.recipes.slice(); // Returns a new array which is an exact copy of the recipes array (as opposed to providing a reference to the recipes).
  }

  getRecipe(index: number) {
      return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
