import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 0.1rem solid var(--color-grey-100);
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;