import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};

  input {
    width: clamp(16rem, 24.3rem, 100%);
    &:focus-within {
      transition: 400ms ease-out;
      width: 100%;
    }
  }
`;
