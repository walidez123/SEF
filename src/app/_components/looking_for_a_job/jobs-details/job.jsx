import PropTypes from "prop-types";
import { IoLocationSharp } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import styled from "styled-components";

// Styled Components
const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.4);  padding: 1rem;
  border-radius: 0.375rem;
`;

const JobHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.8);  padding: 1rem;
  border-radius: 0.375rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const JobTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CompanyName = styled.span`
  color: #dc143c;
  font-size: 2.25rem;
  font-weight: bold;
  padding-right: 1rem;

  @media (min-width: 768px) {
    padding-right: 1.5rem;
  }
`;

const JobDetails = styled.div`
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const JobTitle = styled.p`
  color: #ffffff;
  font-size: 1.25rem;
`;

const JobLocation = styled.p`
  color: #ffffff;
  opacity: 0.75;
  font-size: 1rem;
`;

const SalaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1rem;

  @media (min-width: 768px) {
    width: auto;
    padding-top: 0;
  }
`;

const SalaryText = styled.p`
  color: #ffffff;
`;

const LocationText = styled.p`
  display: flex;
  align-items: center;
  color: #ffffff;
  width: 6rem;
`;

const LocationIcon = styled(IoLocationSharp)`
  color: #bf9b30;
  margin-right: 0.25rem;
`;

const Description = styled.div`
  color: #ffffff;
  opacity: 0.8;
  padding: 0.5rem;
`;

const TagButton = styled.button`
  border: 1px solid #bf9b30;
  color: #ffffff;
  font-size: 1.25rem;
  border-radius: 0.375rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
  background: transparent;

  &:last-of-type {
    margin-right: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeText = styled.p`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 1.25rem;
  gap: 0.25rem;
`;

const TimeIcon = styled(CiClock1)`
  color: #9ca3af;
  font-size: 1.25rem;
`;

const ViewDetailsButton = styled.button`
  background-color: #bf9b30;
  color: #ffffff;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #a97f29;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AboutCompany = styled.p`
  color: #ffffff;
  opacity: 0.75;
  font-size: 1rem;
`;

// Job Component
const Job = ({
  companyName,
  position,
  location,
  salaryRange,
  place,
  description,
  skills,
  jobType,
  requirements,
  postedAt,
  aboutCompany,
  currency,
  onViewDetails,
}) => {
  return (
    <JobCard>
      <JobHeader>
        <JobTitleContainer>
          <CompanyName>{companyName}</CompanyName>
          <JobDetails>
            <JobTitle>{position}</JobTitle>
            <JobLocation>{location}</JobLocation>
          </JobDetails>
        </JobTitleContainer>
        <SalaryContainer>
          <SalaryText>
            {salaryRange} {currency} Per Year
          </SalaryText>
          <LocationText>
            <LocationIcon />
            {place}
          </LocationText>
        </SalaryContainer>
      </JobHeader>
      <AboutCompany>{aboutCompany}</AboutCompany>
      <Description>
        <p>{description}</p>
        <p>
          <strong>Requirements:</strong> {requirements}
        </p>
      </Description>
      <TagContainer>
        {skills.split(", ").map((skill, index) => (
          <TagButton key={index}>{skill}</TagButton>
        ))}
      </TagContainer>
      <Footer>
        <TimeText>
          <TimeIcon /> Posted on {new Date(postedAt).toLocaleDateString()}
        </TimeText>
        <ViewDetailsButton
          onClick={() => {
            console.log("View Details clicked");
            onViewDetails();
          }}
        >
          View Details
        </ViewDetailsButton>
      </Footer>
    </JobCard>
  );
};

// Prop Types
Job.propTypes = {
  companyName: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  salaryRange: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  requirements: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  aboutCompany: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Job;
