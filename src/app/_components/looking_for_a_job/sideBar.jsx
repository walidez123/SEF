import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getJobs } from '@/services/apiJobs';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
    padding: 1rem;
  border-radius: 0.125rem;
  color: #ffffff;
  height: 680px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #000000;
  padding: 0.5rem;
`;

const ClearButton = styled.button`
  color: #fbbf24;
  background-color: rgba(0, 0, 0, 1);
    border: none;
  cursor: pointer;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.p`
  color: #ffffff;
`;

const Select = styled.select`
  background-color: #4b5563;
  color: #ffffff;
  padding: 0.25rem;
  border-radius: 0.125rem;
`;

const CheckboxWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  height: 1rem;
  width: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.125rem;
  appearance: none;
  cursor: pointer;
  background-color: #ffffff;
  position: relative;

  &:checked {
    background-color: #fbbf24;
    border-color: #fbbf24;
  }

  &:checked::before {
    content: "✔";
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    text-align: center;
    color: #ffffff;
    font-size: 0.75rem;
  }
`;

const CheckboxLabel = styled.label`
  color: #ffffff;
`;

const CreateCVButton = styled.button`
  background-color: #fbbf24;
  color: #ffffff;
  padding: 0.75rem;
  margin-top: 1rem;
  font-weight: bold;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f59e0b;
  }
`;

const SideBar = ({ onFilterChange }) => {
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState([]);
  const [level, setLevel] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableJobTypes, setAvailableJobTypes] = useState([]);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableSalaryRanges, setAvailableSalaryRanges] = useState([]);

  useEffect(() => {
    if (typeof onFilterChange !== 'function') {
      console.error('onFilterChange prop is not a function');
      return;
    }
    
    // Fetch jobs and set available filter options
    const fetchJobs = async () => {
      try {
        const { data } = await getJobs();

        // Extract unique values for the filters from the jobs data
        const locations = [...new Set(data.map(job => job.location))];
        const jobTypes = [...new Set(data.map(job => job.jobType))];
        const levels = [...new Set(data.map(job => job.level))];
        const salaryRanges = [...new Set(data.map(job => job.salaryRange))];

        setAvailableLocations(locations);
        setAvailableJobTypes(jobTypes);
        setAvailableLevels(levels);
        setAvailableSalaryRanges(salaryRanges.slice(0, 5)); // Limit to 5 options
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Notify parent component of filter change
    onFilterChange({ location, jobType, level, salaryRange });
  }, [location, jobType, level, salaryRange, onFilterChange]);

  const handleCheckboxChange = (setter, value) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleClearFilters = () => {
    setLocation("");
    setJobType([]);
    setLevel([]);
    setSalaryRange([]);
  };

  return (
    <SidebarContainer>
      <FilterHeader>
        <p>Filter</p>
        <ClearButton onClick={handleClearFilters}>Clear All</ClearButton>
      </FilterHeader>
      <Section>
        <SectionTitle>Location</SectionTitle>
        <Select
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {availableLocations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </Select>
      </Section>
      <Section>
        <SectionTitle>Job Type</SectionTitle>
        {availableJobTypes.map((type, index) => (
          <CheckboxWrapper key={index}>
            <Checkbox
              type="checkbox"
              id={type}
              checked={jobType.includes(type)}
              onChange={() => handleCheckboxChange(setJobType, type)}
            />
            <CheckboxLabel htmlFor={type}>{type}</CheckboxLabel>
          </CheckboxWrapper>
        ))}
      </Section>
      <Section>
        <SectionTitle>Level</SectionTitle>
        {availableLevels.map((lvl, index) => (
          <CheckboxWrapper key={index}>
            <Checkbox
              type="checkbox"
              id={lvl}
              checked={level.includes(lvl)}
              onChange={() => handleCheckboxChange(setLevel, lvl)}
            />
            <CheckboxLabel htmlFor={lvl}>{lvl}</CheckboxLabel>
          </CheckboxWrapper>
        ))}
      </Section>
      <Section>
        <SectionTitle>Salary Range</SectionTitle>
        {availableSalaryRanges.map((range, index) => (
          <CheckboxWrapper key={index}>
            <Checkbox
              type="checkbox"
              id={range}
              checked={salaryRange.includes(range)}
              onChange={() => handleCheckboxChange(setSalaryRange, range)}
            />
            <CheckboxLabel htmlFor={range}>{range}</CheckboxLabel>
          </CheckboxWrapper>
        ))}
        <CreateCVButton>Create Your CV</CreateCVButton>
      </Section>
    </SidebarContainer>
  );
};

export default SideBar;
