import React, { useState } from "react";
import { TextField, Button, Alert, Input } from "@mui/material";
import Recipes from "../modules/Recipes";
import utilities from "../modules/utilities";

const RecipeCreateForm = () => {
  const [recipe, setRecipe] = useState({});
  const [message, setMessage] = useState();
  const [fileName, setFileName] = useState("");

  const createRecipe = async () => {
    const response = await Recipes.create(recipe);
    setMessage(response.message);
  };

  const handleChange = (event) => {
    setRecipe({
      ...recipe,
      [event.target.name]: event.target.value
    });
  };

  const handleImage = async (event) => {
    event.preventDevault();
    const file = event.target.files[0];
    file.name && setFileName(file.name);
    const encodedFile = await utilities.imageEncoder(file);
    setRecipe({ ...recipe, image: encodedFile });
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Recipe name"
        variant="outlined"
        data-cy="name-input"
        name="name"
        onChange={handleChange}
      />
      <div>
        <TextField
          id="outlined-basic"
          label="Instructions"
          multiline
          rows={4}
          variant="outlined"
          data-cy="instructions"
          name="instructions"
          onChange={handleChange}
        />
      </div>
      <Button variant="outlined" data-cy="submit-btn" onClick={createRecipe}>
        Save
      </Button>
      <label>
        <Input data-cy="attach-image" accept="image/*" onChange={handleImage} />
        <Button variant="outlined">Image</Button>
      </label>
      {message && (
        <Alert data-cy="flash-message" severity="info">
          {message}
        </Alert>
      )}
    </div>
  );
};

export default RecipeCreateForm;
