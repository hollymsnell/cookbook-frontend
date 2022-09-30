<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
      newRecipeParams: {},
      editRecipeParams: {},
      currentRecipe: {},
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
    showRecipe: function (recipe) {
      this.currentRecipe = recipe;
      document.querySelector("#recipe-details").showModal();
    },
    updateRecipe: function (recipe) {
      axios
        .patch("/recipes/" + recipe.id, this.editRecipeParams)
        .then((response) => {
          console.log("recipes update", response);
          this.currentRecipe = {};
        })
        .catch((error) => {
          console.log("recipes update error", error.response);
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
      <button v-on:click="showRecipe(recipe)">Read Recipe</button>
    </div>
    <dialog id="recipe-details">
      <form method="dialog">
        <h1>Full Recipe</h1>
        <p>Name: {{ currentRecipe.name }}</p>
        <p>Ingredients: {{ currentRecipe.ingredients }}</p>
        <p>Instructions: {{ currentRecipe.instructions }}</p>
        <p>Prep-time: {{ currentRecipe.prep_minutes }}</p>
        <p>Cook-time: {{ currentRecipe.cook_minutes }}</p>
        <h2>Edit:</h2>
        <p>
          Name:
          <input type="text" v-model="editRecipeParams.name" />
        </p>
        <p>
          Ingredients:
          <input type="text" v-model="editRecipeParams.ingredients" />
        </p>
        <p>
          Instructions:
          <input type="text" v-model="editRecipeParams.instructions" />
        </p>
        <p>
          Prep-time:
          <input type="text" v-model="editRecipeParams.prep_minutes" />
        </p>
        <p>
          Cook-time:
          <input type="text" v-model="editRecipeParams.cook_minutes" />
        </p>
        <p>
          Photo:
          <input type="text" v-model="editRecipeParams.image" />
        </p>
        <button v-on:click="updateRecipe(currentRecipe)">Update</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
