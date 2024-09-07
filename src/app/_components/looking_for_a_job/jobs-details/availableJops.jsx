import { useEffect, useState } from "react";
import Job from "./Job";
import JobDetails from "./JobDetails";
import { getJobs } from "@/services/apiJobs";
import styled from "styled-components";

// Styled Components (with updated background colors)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.375rem;
  background-color: rgba(0, 0, 0, 0.4); /* Light black with 40% opacity */
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  background-color: rgba(0, 0, 0, 0.8); /* Darker black with 80% opacity */
`;

const Button = styled.button`
  background-color: #bf9b30;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #a97f29;
  }

  &:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  color: #333;
  font-size: 0.875rem;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #333;
`;

const Error = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #dc143c;
`;

const AvailableJobs = ({ filterCriteria, searchQuery }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const jobsPerPage = 2;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getJobs();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs");
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const filterJobs = () => {
      const filtered = jobs.filter((job) => {
        const matchesLocation = filterCriteria.location
          ? job.location.includes(filterCriteria.location)
          : true;

        const matchesJobType = filterCriteria.jobType.length
          ? filterCriteria.jobType.includes(job.jobType)
          : true;

        const matchesLevel = filterCriteria.level.length
          ? filterCriteria.level.includes(job.level)
          : true;

        const matchesSalaryRange = filterCriteria.salaryRange.length
          ? filterCriteria.salaryRange.includes(job.salaryRange)
          : true;

        const matchesSearchQuery = searchQuery
          ? job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.position.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        return (
          matchesLocation &&
          matchesJobType &&
          matchesLevel &&
          matchesSalaryRange &&
          matchesSearchQuery
        );
      });

      setFilteredJobs(filtered);
      setCurrentPage(1);
    };

    if (jobs.length > 0) {
      filterJobs();
    }
  }, [filterCriteria, jobs, searchQuery]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJobs.length / jobsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setSelectedJob(null);
    setViewMode("list");
  };

  if (viewMode === "detail" && selectedJob) {
    return <JobDetails job={selectedJob} onBack={handleBackToList} />;
  }

  return (
    <Container>
      {loading && <Loading>Loading jobs...</Loading>}
      {error && <Error>{error}</Error>}
      {!loading && currentJobs.length > 0
        ? currentJobs.map((job) => (
            <Job
              key={job.id}
              {...job} // Spread all job properties
              onViewDetails={() => handleViewDetails(job)}
            />
          ))
        : !loading && <p>No jobs available based on the filters applied.</p>}

      {!loading && (
        <PaginationControls>
          <Button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <PageInfo>
            Page {currentPage} of {Math.ceil(filteredJobs.length / jobsPerPage)}
          </PageInfo>
          <Button
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(filteredJobs.length / jobsPerPage)
            }
          >
            Next
          </Button>
        </PaginationControls>
      )}
    </Container>
  );
};

export default AvailableJobs;
