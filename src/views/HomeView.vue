<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      newRecipeParams: {},
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("/recipes").then((response) => {
        console.log("recipes index", response);
        this.recipes = response.data;
      });
    },
    createRecipe: function () {
      axios
        .post("/recipes", this.newRecipeParams)
        .then((response) => {
          console.log("recipes create", response);
          this.recipes.push(response.data);
          this.newRecipeParams = {};
        })
        .catch((error) => {
          console.log("recipes create error", error.response);
        });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>New Recipe</h1>
    <div>
      <div>
        Name:
        <input type="text" v-model="newRecipeParams.name" />
      </div>
      <div>
        Ingredients:
        <input type="text" v-model="newRecipeParams.ingredients" />
      </div>
      <div>
        Instructions:
        <input type="text" v-model="newRecipeParams.instructions" />
      </div>
      <div>
        Prep-minutes:
        <input type="text" v-model="newRecipeParams.prep_minutes" />
      </div>
      <div>
        Cook-minutes:
        <input type="text" v-model="newRecipeParams.cook_minutes" />
      </div>
      <div>
        Image:
        <input type="text" v-model="newRecipeParams.image" />
      </div>
      <div>
        <button v-on:click="createRecipe()">Create Recipe</button>
      </div>
    </div>
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>{{ recipe.name }}</h2>
      <img v-bind:src="recipe.image" v-bind:alt="recipe.name" />
    </div>
  </div>
</template>

<style></style>
