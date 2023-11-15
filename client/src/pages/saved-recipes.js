import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  // initial data fetching
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  useEffect(() => {
    // additional useEffect logic if needed
  }, [userID]);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <div className="ingredients">
              <h5>Ingredients:</h5>
              {recipe.ingredients.map((ingredient, index) => (
                <p key={index}>
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
