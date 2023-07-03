import React, {useEffect, useState} from "react";
import SearchForm from "../form/SearchForm";
import LoadingSpinner from "../support/LoadingSpinner";
import CompanyCard from "../company/CompanyCard";
import JoblyApi from '../api/api';
function CompaniesList(){
    const [companies, setCompanies] = useState(null);
    
    //We use useEffect here for fetch data from backend
    //we also can put search() inside the useEffect
    useEffect (function getCompaniesFisrtRender(){
        search();
    }, []);
    async function search(name){
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }
    if (!companies) return <LoadingSpinner />;
    
    // we need sign a key for each element inside an array of CompanyCard
    return (
        <div>
            <SearchForm search = {search} />
            {companies.length ? ( <div className="CompanyList-list">
                {companies.map(c => (
                    <CompanyCard   
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                    />
                ))}

            </div>) : (<p>There is no company available</p>)}
        </div>
    )

}
export default CompaniesList;