import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
    const [cookies, _] = useCookies(["access_token"]);
    const [recipe, setRecipe] = useState({
        name: "",
        ingredient: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: 0,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    };

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    };

    const handleIngredientChange = (event, index) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({...recipe, ingredients});
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe);
            alert("Recipe Created");
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div className="create-recipe">
          <h2>Create Recipe</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="ingredients">Ingredients</label>
            <button onClick={addIngredient} type="button">
              Add Ingredient
            </button>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
            />
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleChange}
            />
            <button type="submit">Create Recipe</button>
          </form>
        </div>
    );
};
