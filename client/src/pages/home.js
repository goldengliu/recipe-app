import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]); // Add userID to the dependency array


  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
      <div>
        <h1>Recipes</h1>
        <ul>
          {recipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <img src={recipe.imageUrl} alt={recipe.name} loading={'lazy'} />
                  <h2>{recipe.name}</h2>
                  <button
                      onClick={() => saveRecipe(recipe._id)}
                      disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                </div>

                <div className="ingredients">
                  <h5>Ingredients:</h5>
                  {recipe.ingredients.map((ingredient) => (
                      <p>
                         - {ingredient}
                      </p>
                  ))}
                </div>

                <div className="instructions">
                  <h5>Directions:</h5>
                  <p>{recipe.instructions}</p>
                </div>
                <h5>Cooking Time: {recipe.cookingTime} minutes</h5>
              </li>
          ))}
        </ul>
      </div>
  );
};