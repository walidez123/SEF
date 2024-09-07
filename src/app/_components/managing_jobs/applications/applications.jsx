import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getApplications } from '@/services/apiApplications'; // Adjust the path as needed

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
  max-width: 1200px;
  margin: auto;
  border-radius: 0.375rem;
`;

const Header = styled.h1`
  color: #DC143C;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ApplicationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;

  th, td {
    padding: 0.75rem;
    text-align: left;
  }

  th {
  background-color: rgba(0, 0, 0, 0.9);
  }

  tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.9);
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;

    thead {
      display: none;
    }

    tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid #374151;
    }

    td {
      display: block;
      text-align: right;
      position: relative;
      padding-left: 50%;
      white-space: nowrap;

      &:before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 0.75rem;
        font-weight: bold;
        color: #BF9B30;
      }
    }
  }
`;

const DownloadButton = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border-radius: 0.375rem;
  background-color: #BF9B30; /* Gold color */
  color: white;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  cursor: pointer; /* Pointer cursor on hover */
  
  &:hover {
    background-color: #A97F29; /* Darker gold on hover */
  }
`;

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Container>
      <Header>Applications List</Header>
      <ApplicationsTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>CV</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.phone}</td>
              <td>{application.experience}</td>
              <td>
                <DownloadButton href={application.cvUrl} download>
                  Download CV
                </DownloadButton>
              </td>
            </tr>
          ))}
        </tbody>
      </ApplicationsTable>
    </Container>
  );
};

export default ApplicationsList;
