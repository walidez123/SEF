import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TbCloudUpload } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import styled from 'styled-components';

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

const EITTitle = styled.span`
  color: #DC143C;
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
  color: white;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Location = styled.p`
  color: white;
  opacity: 0.75;
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
  color: white;
`;

const LocationText = styled.p`
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

const UserName = styled.h2`
  font-size: 1.5rem;
`;

const UserDescription = styled.p`
  opacity: 0.75;
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
  box-sizing: border-box;
  max-width: 100%;

  &.lg-min-w {
    min-width: 300px;
    max-width: 100%;
  }

  &.lg-max-w {
    max-width: 320px;
  }

  & > span {
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }
`;

const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.4);
    padding: 0.5rem;
  margin-top: 0.25rem;
  border-radius: 0.375rem;
  width: 100%;
  box-sizing: border-box;
`;

const UploadContainer = styled.div`
  color: white;
  padding: 1rem;
`;

const DropzoneContainer = styled.div`
  max-width: 480px;
  padding: 1rem 3rem;
  margin-top: 0.5rem;
  border-radius: 0.375rem;
  border: 2px dashed ${({ isDragActive }) => (isDragActive ? '#10B981' : '#BF9B30')};
  background-color: rgba(0, 0, 0, 0.8);
    text-align: center;

  & > span {
    color: #BF9B30;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-bottom: 0.5rem;
  }

  & > p {
    & > span {
      color: #BF9B30;
    }
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

const SendCV = ({ jobTitle, location, salary, userName, userDescription, companyName }) => {
    const [formData, setFormData] = useState({
        email: '',
        experience: '',
        mobile: ''
    });
    const [errors, setErrors] = useState({});
    const [uploadError, setUploadError] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.experience) newErrors.experience = 'Years of Experience is required';
        if (!formData.mobile) newErrors.mobile = 'Mobile Number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onDrop = useCallback((acceptedFiles) => {
        // Handle file validation and error
        if (acceptedFiles.length === 0) {
            setUploadError('No files selected.');
        } else {
            setUploadError('');
            console.log(acceptedFiles);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form data:', formData);
            // Add your form submission logic here
        }
    };

    return (
        <Container>
            <Section>
                <div>
                    <EITTitle>{companyName}</EITTitle>
                    <JobDetails>
                        <JobTitle>{jobTitle}</JobTitle>
                        <Location>{location}</Location>
                    </JobDetails>
                </div>
                <SalaryContainer>
                    <SalaryText>{salary}</SalaryText>
                    <LocationText>
                        <LocationIcon><IoLocationSharp /></LocationIcon>
                        on site
                    </LocationText>
                </SalaryContainer>
            </Section>
            <UserDetails>
                <UserName>{userName}</UserName>
                <UserDescription>{userDescription}</UserDescription>
            </UserDetails>
            <Form onSubmit={handleSubmit}>
                <FormRow>
                    <FormField className="lg-min-w">
                        <span>Email</span>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-describedby="emailError"
                        />
                        {errors.email && <span id="emailError" style={{ color: 'red' }}>{errors.email}</span>}
                    </FormField>
                    <FormField className="lg-min-w">
                        <span>Years of Experience</span>
                        <Input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            aria-describedby="experienceError"
                        />
                        {errors.experience && <span id="experienceError" style={{ color: 'red' }}>{errors.experience}</span>}
                    </FormField>
                </FormRow>
                <FormField className="lg-min-w">
                    <span>Mobile Number</span>
                    <Input
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        aria-describedby="mobileError"
                    />
                    {errors.mobile && <span id="mobileError" style={{ color: 'red' }}>{errors.mobile}</span>}
                </FormField>
                <UploadContainer>
                    <span>Upload CV</span>
                    <DropzoneContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                    >
                        <input {...getInputProps()} />
                        <span>
                            <TbCloudUpload size={60} />
                        </span>
                        {
                            isDragActive ?
                                <p>Drop the files here...</p> :
                                <p>Drag & drop files or <span>browse</span></p>
                        }
                    </DropzoneContainer>
                    {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
                </UploadContainer>
                <ButtonGroup>
                    <Button variant="cancel" type="button">Cancel</Button>
                    <Button variant="submit" type="submit">Submit</Button>
                </ButtonGroup>
            </Form>
        </Container>
    );
};

export default SendCV;
