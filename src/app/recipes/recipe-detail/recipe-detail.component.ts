import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // recipe: Recipe = new Recipe(
  //   'Schnitzel',
  //   'A super-tasty Schnitzel!',
  //   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //   [
  //     new Ingredient('Meet', 1),
  //     new Ingredient('French Fries', 20)
  //   ]
  // );

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {

  }

  onDeleteRecipe() {

  }

}
