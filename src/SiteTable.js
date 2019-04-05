import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { CSVLink } from "react-csv";

class SiteTable extends React.Component {
  render() {
    const data = this.props.sites;
    const columns = [
      {
        Header: "SiteID",
        accessor: "siteID"
      },
      {
        Header: "Latitude",
        accessor: "latitude"
      },
      {
        Header: "Longitude",
        accessor: "longitude"
      },
      {
        Header: "Beamwidth",
        accessor: "beamwidth"
      },
      {
        Header: "Azimuth",
        accessor: "azimuth"
      },
      {
        Header: "Size",
        accessor: "size"
      }
    ];

    return (
      <div>
        <CSVLink data={data}> Export to CSV </CSVLink>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 15, 20]}
        />
      </div>
    );
  }
}

export default SiteTable;
