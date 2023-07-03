import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../support/LoadingSpinner";
import JobCardList from "../job/JobCardList";
import JoblyApi from "../api/api";
function CompanyDetail() {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);
  const [company, setCompany] = useState(null);
  useEffect(
    function getCompaniesAndJobsForUser() {
      async function getCompany() {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company);
      }
      getCompany();
    },[handle]
  );
  if (!company) return <LoadingSpinner />;
   // In Company model of backend company did create a new column jobs by select jobs form job table
  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );

}
export default CompanyDetail;
