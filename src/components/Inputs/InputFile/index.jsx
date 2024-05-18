import { PiUploadSimpleBold } from "react-icons/pi";
import { InputFileContainer, Files } from "./styles";
export function InputFile({title, filename}) {
  return (
    <InputFileContainer>
      {title && title}
      <Files>
        <label htmlFor="image">
          <PiUploadSimpleBold />
          <span>{filename || "Selecionar imagem"}</span>
          <input id="image" type="file" />
        </label>
      </Files>
    </InputFileContainer>
  );
}