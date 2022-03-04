import styled from "styled-components";

export default function About() {
  return (
    <Wrapper>
      <h1>
        About
      </h1>
      <p>
        Projet guid&eacute;, r&eacute;alis&eacute; dans le cadre de la formation "Graduate Developper Full Stack" chez Digital Campus.
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & p {
    margin: 12px;
  }
`;