import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiCaretLeft } from "react-icons/pi";
import { toast } from "react-toastify";
import { api } from "../../services/api";

import { PageLayout } from "../../components/Layouts/PagesLayout";
import { IngredientTag } from "../../components/IngredientTag";
import { InputNumeric } from "../../components/Inputs/InputNumeric";
import { InputFile } from "../../components/Inputs/InputFile";
import { Textarea } from "../../components/Inputs/Textarea";
import { Section } from "../../components/Section";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { Input } from "../../components/Inputs/Input";

import { NewContainer, Main, Form, LabelTitle } from "./styles";

export function New() {
  const redirectTo = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [ingredients, setIngredients] = useState([]);
  const [newIngredients, setNewIngredients] = useState("");

  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("");

  function handleAddImageToDish(e) {
    const file = e.target.files[0];
    setImage(file);
    setFilename(file.name);
  }

  function handleAddIngredients() {
    setIngredients((prevState) => [...prevState, newIngredients.trim()]);
    setNewIngredients("");
  }

  function handleRemoveIngredients(deleted) {
    setIngredients((prevState) =>
      prevState.filter((ingredient) => ingredient !== deleted)
    );
  }

  function handleBackPage() {
    redirectTo(-1);
  }

  async function handleCreateDish() {
    const priceValue = parseFloat(price.replace(",", "."));

    if (!image) {
      return toast.error("Por favor, insira uma imagem.");
    }

    if (!name.trim() || !description.trim()) {
      return toast.error("Por favor, preencha todos os campos.");
    }

    if (priceValue <= 0 || !priceValue) {
      return toast.error("Por favor, insira um preço válido.");
    }

    if (ingredients.length === 0) {
      return toast.error("Por favor, insira um ingrediente do seu prato.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", priceValue);
    formData.append("description", description);
    formData.append("ingredients", JSON.stringify(ingredients));

    try {
      const response = await api.post("/dishes", formData);
      toast.success(response.data.message);
      redirectTo(`/details/${response.data.id}`);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <NewContainer>
      <PageLayout>
        <Main>
          <a onClick={handleBackPage}>
            <PiCaretLeft /> Voltar
          </a>
          <h1>Criar prato</h1>

          <Form>
            <Section className="first-section">
              <InputFile
                title="Imagem"
                filename={filename}
                onChange={handleAddImageToDish}
              />

              <Input
                title="Nome"
                placeholder="Exemplo: Salada Caesar"
                onChange={(e) => setName(e.target.value)}
              />

              <Select
                title="Categorias"
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Section>

            <Section className="second-section">
              <LabelTitle>
                Ingredientes
                <div className="background">
                  {ingredients.map((ingredient, index) => (
                    <IngredientTag
                      key={String(index)}
                      title={ingredient}
                      onClickButton={() => handleRemoveIngredients(ingredient)}
                    />
                  ))}

                  <IngredientTag
                    value={newIngredients}
                    placeholder="Adicionar"
                    isNew
                    onChange={(e) => setNewIngredients(e.target.value)}
                    onClickButton={handleAddIngredients}
                  />
                </div>
              </LabelTitle>

              <InputNumeric title="Preço" setPrice={setPrice} />
            </Section>

            <Section>
              <Textarea
                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição."
                title="Descrição"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Section>

            <Button
              type="button"
              title="Salvar alterações"
              onClick={handleCreateDish}
            />
          </Form>
        </Main>
      </PageLayout>
    </NewContainer>
  );
}
