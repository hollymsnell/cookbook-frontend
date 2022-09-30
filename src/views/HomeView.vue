<script>
import axios from "axios";
export default {
  data: function () {
    return {
      recipes: [],
    };
  },
  created: function () {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function () {
      axios.get("/recipes").then((response) => {
        console.log("recipes index", response);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes" v-bind:key="recipe.id">
      <h2>{{ recipe.name }}</h2>
    </div>
  </div>
</template>

<style></style>
