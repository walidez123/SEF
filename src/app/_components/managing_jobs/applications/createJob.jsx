import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { TbCloudUpload } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import styled from 'styled-components';
import { createUpdateJobs } from '@/services/apiJobs'; // Adjust the path as needed
const LocationSelect = styled.div`
  display: flex;
  align-items: center;
  color: white;
  width: 100%;

  & > select {
  background-color: rgba(0, 0, 0, 0.8);  
    color: white;
    border: 1px solid #374151;
    border-radius: 0.375rem;
    padding: 0.75rem;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  & > span {
    margin-right: 0.5rem;
    color: #BF9B30;
  }
`;
const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  padding: 1.5rem 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Title = styled.h2`
  color: #DC143C;
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  border-bottom: 1px solid #BF9B30;
`;

const JobDetails = styled.div`
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const InputLabel = styled.label`
  color: white;
  display: block;
  margin-bottom: 0.5rem;
  opacity: 0.8;
  font-size: 1rem;
`;

const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.8);  padding: 0.75rem;
  border-radius: 0.375rem;
  width: 100%;
  color: white;
  border: 1px solid #374151; // Border color to match the design
  box-sizing: border-box; // Prevent overflow
`;

const Textarea = styled.textarea`
  background-color: rgba(0, 0, 0, 0.8);  padding: 0.75rem;
  border-radius: 0.375rem;
  width: 100%;
  color: white;
  border: 1px solid #374151; // Border color to match the design
  resize: vertical;
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

const SalaryText = styled(Input)`
  border-bottom: 1px solid white;
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
  width: 6rem;
`;

const LocationIcon = styled.span`
  color: #BF9B30;
  display: flex;
  margin-right: 0.25rem;
`;

const UserDetails = styled.div`
  color: white;
  padding: 1rem;
`;

const Form = styled.form``;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 1.5rem;
  width: 100%;
  box-sizing: border-box; // Ensure proper sizing
  max-width: 100%; // Prevent the fields from exceeding container width

  &.lg-min-w {
    min-width: 300px;
    max-width: 100%; // Ensure max width is limited
  }

  &.lg-max-w {
    max-width: 320px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding: 0 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-weight: bold;
  color: white;
  background-color: ${({ variant }) => (variant === 'submit' ? '#BF9B30' : '#6B7280')};
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) => (variant === 'submit' ? '#A97F29' : '#4B5563')};
  }
`;

const SendCV = () => {
    const [formData, setFormData] = useState({
        email: '',
        yearsOfExperience: '',
        mobileNumber: '',
        aboutCompany: '',
        companyName: '',
        createdAt: new Date().toISOString(),
        currency: 'USD',
        description: '',
        field: '',
        jobType: 'Full-time',
        location: '',
        place: 'On-site',
        position: '',
        postedAt: new Date().toISOString(),
        requirements: '',
        salaryRange: '120,000 - 150,000',
        skills: '',
        status: 'Open'
    });

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id } = formData; // Pass an id if editing an existing job
            await createUpdateJobs(formData, id);
            alert('Job details saved successfully!');
        } catch (error) {
            console.error('Error saving job details:', error);
            alert('Failed to save job details');
        }
    };

    return (
        <Container>
            <Section>
                <div>
                    <JobDetails>
                        <FormField>
                            <InputLabel htmlFor="position">Job Title</InputLabel>
                            <Input
                                id="position"
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <InputLabel htmlFor="location">Location</InputLabel>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </FormField>
                    </JobDetails>
                </div>
                <SalaryContainer>
                    <FormField>
                        <InputLabel htmlFor="salaryRange">Salary Range</InputLabel>
                        <SalaryText
                            id="salaryRange"
                            type="text"
                            name="salaryRange"
                            value={formData.salaryRange}
                            onChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <InputLabel htmlFor="currency">currency</InputLabel>
                        <SalaryText
                            id="currency"
                            type="text"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                        />
                    </FormField>
                    <LocationSelect>
                        <span><IoLocationSharp /></span>
                        <select
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                        >
                            <option value="On-site">On-site</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </LocationSelect>
                </SalaryContainer>
            </Section>
            <UserDetails>
                <FormField>
                    <InputLabel htmlFor="companyName">Company Name</InputLabel>
                    <Input
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <InputLabel htmlFor="description">Job Description</InputLabel>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </FormField>
            </UserDetails>
            <Form onSubmit={handleSubmit}>
                <FormRow>
                    <FormField className="lg-min-w">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </FormField>
                    <FormField className="lg-min-w">
                        <InputLabel htmlFor="yearsOfExperience">Years of Experience</InputLabel>
                        <Input
                            id="yearsOfExperience"
                            type="number"
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                        />
                    </FormField>
                </FormRow>
                <FormField className="lg-min-w">
                    <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
                    <Input
                        id="mobileNumber"
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                    />
                </FormField>
                <ButtonGroup>
                    <Button type="button" variant="cancel">Cancel</Button>
                    <Button type="submit" variant="submit">Submit</Button>
                </ButtonGroup>
            </Form>
        </Container>
    );
};

export default SendCV;
