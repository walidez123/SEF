import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  // padding: 1rem;
  border-radius: 0.125rem;
  color: #ffffff;
  // height: 680px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 0.125rem;
  flex: 1;
  text-align: center;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); /* Optional: Adds shadow effect */
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.8);

  margin-bottom: 1rem;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #d1d5db;
`;

const SectionItem = styled.div`
  padding: 0.5rem;
  // background-color: #4b5563;
  border-radius: 0.125rem;
`;

const ApplicationSideBar = () => {
  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>Users</SectionTitle>
        <SectionContent>
          <SectionItem>Admin</SectionItem>
          <SectionItem>Editors</SectionItem>
          <SectionItem>Instructors</SectionItem>
          <SectionItem>Users</SectionItem>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Articles</SectionTitle>
        <SectionContent>
          <SectionItem>Published Articles</SectionItem>
          <SectionItem>Scheduled Articles</SectionItem>
          <SectionItem>Saved Draft</SectionItem>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Jobs</SectionTitle>
        <SectionContent>
          <SectionItem>Published Jobs</SectionItem>
          <SectionItem>Saved Jobs</SectionItem>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Courses</SectionTitle>
        <SectionContent>
          <SectionItem>Published Courses</SectionItem>
          <SectionItem>Saved Courses</SectionItem>
        </SectionContent>
      </Section>
    </SidebarContainer>
  );
};

export default ApplicationSideBar;
