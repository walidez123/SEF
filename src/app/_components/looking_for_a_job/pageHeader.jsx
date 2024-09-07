import { IoFilter } from "react-icons/io5";
import { useState, useEffect } from "react";
import styled from 'styled-components';

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem 0;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const TextContainer = styled.div`
  color: #FFFFFF;
`;

const Heading = styled.h2`
  font-size: 1.875rem;
  margin-top: 0.75rem;
`;

const Description = styled.p`
  opacity: 0.8;
  margin-top: 0.75rem;
  max-width: 24rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: rgba(0, 0, 0, 0.9);  
  color: #FFFFFF;
  font-size: 1.25rem;
  width: 100%;
  @media (min-width: 768px) {
    border-radius: 0;
  }
`;

const Button = styled.button`
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  width: 100%;
  background-color: #FBBF24;
  color: #FFFFFF;
  @media (min-width: 768px) {
    border-radius: 0;
  }
`;

const FilterButton = styled.button`
  padding: 1rem;
  border-radius: 0.375rem;
  color: #FBBF24;
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const PageHeader = ({ searchQuery, setSearchQuery }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HeaderContainer>
      <TextContainer>
        <Heading>Looking for a job?</Heading>
        <Description>Here you can find your best match between 1000s of updated and available positions.</Description>
      </TextContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'white', margin: 'auto 0' }}>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search for a job"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button>Search</Button>
            {!isDesktop && <FilterButton><IoFilter /></FilterButton>}
          </div>
        </SearchContainer>
      </div>
    </HeaderContainer>
  );
};

export default PageHeader;
