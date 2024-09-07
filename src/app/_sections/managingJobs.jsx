'use client'
import { useState, useEffect } from "react";
import styled from 'styled-components';
import SideBar from "../_components/looking_for_a_job/sideBar";
import PageHeader from "../_components/looking_for_a_job/pageHeader";
import AvailableJobs from "../_components/looking_for_a_job/jobs-details/availableJops";
import ApplicationsList from "../_components/managing_jobs/applications/applications";
import ApplicationSideBar from "../_components/managing_jobs/applicationSideBar";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure it covers the full viewport height */
  position: relative;
  background-image: url('/secondary_background.jpg');
  background-repeat: repeat;
  background-attachment: fixed; /* Ensures the background image stays fixed */
  background-size: cover; /* Adjusts the size of the background image */
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8); /* Black overlay with opacity */
  z-index: 1; /* Ensure the overlay is above the background */
`;

const ContentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100%;
  position: relative;
  z-index: 2; /* Ensure content is above the overlay */
  display: flex;
  flex-direction: column;
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const SideBarWrapper = styled.div`
  width: 25%;
  @media (max-width: 767px) {
    display: none; /* Hide sidebar on small screens */
  }
`;

const MainContentWrapper = styled.div`
  width: 75%;
  @media (max-width: 767px) {
    width: 100%; /* Full width on small screens */
  }
`;

export default function ManagingJops() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [filterCriteria, setFilterCriteria] = useState({
    location: '',
    jobType: [],
    level: [],
    salaryRange: [],
  });

  // Update the state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); 
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update filter criteria only when there's an actual change
  const handleFilterChange = (newFilterCriteria) => {
    setFilterCriteria((prevCriteria) => {
      // Compare the current criteria with the new criteria before setting state to avoid unnecessary updates
      const isSame = Object.keys(newFilterCriteria).every(key => {
        return prevCriteria[key] === newFilterCriteria[key];
      });

      if (!isSame) {
        return { ...prevCriteria, ...newFilterCriteria };
      }

      return prevCriteria; // No change, so don't update the state
    });
  };

  return (
    <MainContainer>
      <Overlay />
      <ContentWrapper>
      <PageHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ContentRow>
          <SideBarWrapper>
            {isDesktop && <ApplicationSideBar onFilterChange={handleFilterChange} />}
          </SideBarWrapper>
          <MainContentWrapper>
            <ApplicationsList/>
          </MainContentWrapper>
        </ContentRow>
        
      </ContentWrapper>
    </MainContainer>
  );
}
