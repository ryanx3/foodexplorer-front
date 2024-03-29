import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiCaretLeft, PiCameraBold, PiFileArrowUpDuotone } from "react-icons/pi";
import { useForm } from "react-hook-form";

// Components
import * as Layouts from "../../components/Layouts";
import * as Input from "../../components/Input";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { SideMenu } from "../../components/SideMenu";
import { Footer } from "../../components/Footer";
import { Section } from "../../components/Section";

import { useAuth } from "../../hooks/Auth";
import { api } from "../../services/api";
import AvatarPlaceholder from "../../assets/avatarPlaceholder.png";
import axios from "axios";
import { Container, Avatar, Form } from "./styles";
import { toast } from "react-toastify";

export function Profile() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  const { user, updateProfile } = useAuth();

  const AvatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : AvatarPlaceholder;

  const [avatar, setAvatar] = useState(AvatarURL);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleChangeAvatar(event) {
    const file = event.target.files[0];

    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
      const { name, email, old_password, password, cep, street, neighborhood, number_home } = data;
        
    const updated = {
      name,
      email,
      old_password,
      password,
      cep,
      street,
      neighborhood, 
      number_home
    };
    const updatedUser = Object.assign(user, updated);
    await updateProfile({ user: updatedUser, avatarFile })}
  
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!isMobile && isMenuOpen === true) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  async function resetInputAdress() {
      reset({
            cep: "",
            street: "",
            neighborhood: "",
            number_home: ""
            });
  }
  
const checkCEP = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');

    if(cep.length !== 8) {
        resetInputAdress()
        return toast.error("O CEP deve conter no mínimo 8 dígitos")
      }

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (response.data.erro) {
          resetInputAdress()
          return toast.error("CEP inexistente. Por favor, insira um CEP válido.")
        }

        const data = response.data;

        toast.promise(checkCEP, {
          loading: 'Loading',
          success: 'Got the data',
        });
        setFocus("number_home");
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("cep", cep);
};

  return (
    <Container>

      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
      />
      <SideMenu
        isMenuOpen={isMenuOpen}
        isMenuClose={() => setIsMenuOpen(false)}
      />

      <Layouts.Page>
        <main>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <Avatar>
              <a onClick={handleBack}>
                <PiCaretLeft /> Voltar
              </a>

              <img src={avatar} alt={`Avatar de ${user.name}`} />

              <label htmlFor="avatar">
                <PiFileArrowUpDuotone />
                Selecione um avatar
                <input id="avatar" type="file" onChange={handleChangeAvatar} />
              </label>

            </Avatar>

            <div className="input-wrapper">

              <Section className="input-section">

                <div className="input-register">
                  <Input.Default
                    title="Seu nome"
                    {...register("name")}
                    defaultValue={user.name}
                  />

                  <Input.Default
                    title="Seu email"
                    type="email"
                    {...register("email", { required: true })}
                    defaultValue={user.email}
                  />
                  {errors.email && <span>Email é obrigatório</span>}

                  <Input.Default
                    type="password"
                    title="Senha atual"
                    placeholder="Digite a sua senha atual"
                    {...register("old_password")}
                  />

                  <Input.Default
                    type="password"
                    title="Nova senha"
                    placeholder="No mínimo 6 caracteres"
                    {...register("password", { minLength: 6 })}
                  />
                  {errors.password && (
                    <span>A nova senha deve ter no mínimo 6 caracteres</span>
                  )}
                </div>

                <div className="input-adress">
                  <Input.Default
                    title="CEP"
                    type="number"
                    placeholder="Digite o seu CEP"
                    {...register("cep")}
                    defaultValue={user.cep ? user.cep : ""}
                    onBlur={checkCEP}
                  />
                  <Input.Default
                    title="Endereço"
                    placeholder="Digite o seu endereço"
                    defaultValue={user.street ? user.street : ""}
                     {...register("street")}
                  />
                  <Input.Default
                    title="Número"
                    type="number"
                    placeholder="Digite o seu número"
                    defaultValue={user.number_home ? user.number_home : ""}
                     {...register("number_home")}

                  />
                  <Input.Default
                    title="Bairro"
                    placeholder="Seu bairro"
                    defaultValue={user.neighborhood ? user.neighborhood : ""}
                     {...register("neighborhood")}
                  />
                </div>
              </Section>

              <Button type="submit" title="Salvar alterações" />
            </div>
          </Form>
        </main>

      </Layouts.Page>

      <Footer />
    </Container>
  );
}
