import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  }, [userID]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const inName = recipe.name.toLowerCase().includes(lowerCaseQuery);
    const inIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(lowerCaseQuery)
    );
    return inName || inIngredients;
  });

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
      <div style={{ textAlign: 'left', margin: '10px' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="name" hidden>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Search For Recipes"
            onChange={handleSearchChange}
            value={searchQuery}
          />
        </form>
      </div>
      <h1>Recipes</h1>

      {filteredRecipes.length === 0 ? (
        <div>
          <p>No recipes found.</p>
        </div>
      ) : (
        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>

                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>

                <div className="ingredients">
                  {recipe.ingredients.length > 1 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <p key={index}>- {ingredient}</p>
                    ))
                  ) : (
                    <p>No ingredients available</p>
                  )}
                </div>

                {recipe.instructions !== "" ? (
                  <div className="instructions">
                    <p>{recipe.instructions}</p>
                  </div>
                ) : null}

                <img src={recipe.imageUrl} alt={recipe.name} loading="lazy" />
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
