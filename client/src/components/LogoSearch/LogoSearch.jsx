import React from "react";
import './LogoSearch.css'
import { MuiChipsInput } from "mui-chips-input"
import { UilSearch } from '@iconscout/react-unicons'

const LogoSearch = () => {

  return (
    <div className="LogoSearch">
      <div className="Search">
          <MuiChipsInput
            style={{margin: "1px 3px"}}
            label="Search people"
            />
          <div className="s-icon">
                <UilSearch />
          </div>
      </div>
    </div>
  );
};

export default LogoSearch;
