import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

const DishContext = createContext();

function DishProvider({ children }) {
  const [dish, setDish] = useState(null);
  const [ingredientsExists, setIngredientsExists] = useState([]);
  const [category, setCategory] = useState("");

  async function fetchDishDetails(id) {
    try {
      const response = await api.get(`/dishes/${id}`);
      setDish(response.data);
      setCategory(response.data.category);
      setIngredientsExists(response.data.ingredients);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao encontrar detalhes do prato.");
      }
    }
  }

  return (
    <DishContext.Provider
      value={{
        dish,
        setDish,
        category,
        setCategory,
        ingredientsExists,
        setIngredientsExists,
        fetchDishDetails,
      }}
    >
      {children}
    </DishContext.Provider>
  );
}

const useDish = () => useContext(DishContext);

export { useDish, DishProvider };