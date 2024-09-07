import { CiClock1 } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { useState } from "react";
import styled from "styled-components";
import SendCV from "../sendCV";

// Styled Components

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CompanyName = styled.span`
  color: #dc143c; // Tailwind text-red-500
  font-size: 2.25rem; // Tailwind text-4xl
  font-weight: bold;
`;

const TimeInfo = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffffff;
  font-size: 1.25rem; // Tailwind text-xl
`;

const TimeIcon = styled(CiClock1)`
  color: #9ca3af; // Tailwind text-gray-400
  font-size: 1.25rem; // Tailwind text-xl
`;

const JobTitle = styled.h2`
  color: #ffffff; // Tailwind text-white
  font-size: 1.5rem; // Tailwind text-2xl
`;

const JobLocation = styled.p`
  color: #ffffff;
  opacity: 0.8;
`;

const SalaryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; // Added gap for better spacing
`;

const SalaryText = styled.h2`
  color: #ffffff;
  font-size: 1.5rem; // Tailwind text-2xl
`;

const LocationText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffffff;
  font-size: 1.25rem; // Tailwind text-xl
`;

const LocationIcon = styled(IoLocationSharp)`
  color: #fbbf24; // Tailwind text-yellow-400
  font-size: 1.25rem; // Tailwind text-xl
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem; // Tailwind text-2xl
`;

const SectionContent = styled.p`
  color: #ffffff;
  opacity: 0.75;
  font-size: 1rem; // Tailwind text-l
`;

const ApplyButton = styled.button`
  padding: 0.5rem;
  width: 100%;
  max-width: 240px;
  font-size: 1.5rem; // Tailwind text-2xl
  color: #ffffff;
  background-color: #fbbf24; // Tailwind bg-yellow-500
  border-radius: 0.375rem; // Tailwind rounded-md
  cursor: pointer;

  &:hover {
    background-color: #f59e0b; // Darker shade on hover
  }
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
  padding: 1.5rem 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const JobDetails = ({ job, onBack }) => {
  // State to toggle SendCV component visibility
  const [showSendCV, setShowSendCV] = useState(false);

  // Handle the Apply button click
  const handleApplyClick = () => {
    setShowSendCV(true); // Show the SendCV component
  };

  return (
    <Container>
      <ContentWrapper>
        {/* Conditionally render SendCV component */}
        {showSendCV ? (
          <SendCV
            companyName={job.companyName}
            jobTitle={job.position}
            location={job.place}
            salary={job.salaryRange}
            userName="Balqees Hamdi Sabir"
            userDescription="Computer Science at the Islamic University"
          />
        ) : (
          <>
            <Header>
              <CompanyName>{job.companyName}</CompanyName>
              <TimeInfo>
                <TimeIcon /> {new Date(job.postedAt).toLocaleDateString()} {/* Format date */}
              </TimeInfo>
            </Header>
            <div>
              <JobTitle>{job.position}</JobTitle>
              <JobLocation>{job.place}</JobLocation>
            </div>
            <SalaryContainer>
              <SalaryText>{job.salaryRange}</SalaryText>
              <LocationText>
                <LocationIcon /> {job.jobType}
              </LocationText>
            </SalaryContainer>
            <div>
              <SectionTitle>About Us</SectionTitle>
              <SectionContent>{job.aboutCompany}</SectionContent>
            </div>
            <div>
              <SectionTitle>Job Description</SectionTitle>
              <SectionContent>{job.description}</SectionContent>
            </div>
            <div>
              <SectionTitle>Job Requirements</SectionTitle>
              <SectionContent>{job.requirements}</SectionContent>
            </div>
            <div>
              <ApplyButton onClick={handleApplyClick}>Apply</ApplyButton> {/* Apply button triggers showing SendCV */}
            </div>
          </>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default JobDetails;
