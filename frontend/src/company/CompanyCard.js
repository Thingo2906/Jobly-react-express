import React from 'react';
import {Link} from 'react-router-dom';
import "./CompanyCard.css";
// if logo is available, show image of logo on right side
// Component CompaniesList will show all CompanyCard
function CompanyCard({name, description, logoUrl, handle}){
    console.debug("CompanyCard", logoUrl, handle);
    return (
      <div>
        <Link className="CompanyCard card" to={`/companies/${handle}`}>
          <div className="card-body">
            <h6 className="card-title">
              {name}
              {logoUrl && (
                <img src={logoUrl} alt={name} className="float-right ml-5" />
              )}
            </h6>

            <p>
              <small>{description}</small>
            </p>
          </div>
        </Link>
      </div>
    );

}
export default CompanyCard;