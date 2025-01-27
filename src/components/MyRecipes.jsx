import React, { useState, useEffect } from "react";
import { Button, Grid, Container } from "@mui/material";
import RecipeCreateForm from "./RecipeCreateForm";
import Recipes from "../modules/Recipes";
import { useSelector } from "react-redux";
import MyRecipeCard from "./MyRecipeCard";

const MyRecipes = () => {
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useSelector((state) => state);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await Recipes.index(currentUser);

    setRecipes(response.recipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const userRecipes = recipes.map((recipe, index) => {
    recipe.index = index + 1;
    return (
      <Grid item key={recipe.id} md={12}>
        <MyRecipeCard recipe={recipe} />
      </Grid>
    );
  });

  return (
    <Container style={{ margin: "auto", width: "50%" }}>
      {showForm ? (
        <div>
          <Button
            data-cy="hide-recipe"
            onClick={() => setShowForm(!showForm)}
            color="warning"
          >
            Maybe later
          </Button>
          <RecipeCreateForm />
        </div>
      ) : (
        <Button
          data-cy="create-recipe"
          onClick={() => setShowForm(!showForm)}
          color="secondary"
          variant="outlined"
        >
          Add recipe
        </Button>
      )}
      <Grid
        container
        spacing={4}
        data-cy="recipe-collection"
        style={{ marginTop: 10 }}
      >
        {userRecipes}
      </Grid>
    </Container>
  );
};

export default MyRecipes;
