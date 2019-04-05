import React from "react";
import Papa from "papaparse";
import Maps from "./Map";
import SiteTable from "./SiteTable";
class App extends React.Component {
  constructor() {
    super();
    this.updateData = this.updateData.bind(this);
  }

  state = {
    siteList: [],
    siteID: "",
    latitude: "",
    longitude: "",
    size: "20",
    beamwidth: "0",
    azimuth: "0",
    csvfile: undefined
  };
  INITIAL_state = {
    siteList: [],
    siteID: "",
    latitude: "",
    longitude: "",
    size: "20",
    beamwidth: "0",
    azimuth: "0",
    csvfile: undefined
  };
  handleFile() {
    Papa.parse(this.state.csvfile, {
      complete: this.updateData,
      header: true
    });
    console.log("file inputted!");
  }
  updateData = this.updateData.bind(this);
  updateData(result) {
    var data = result.data;
    this.setState({ siteList: data });
  }

  disableButton() {
    if (this.state.csvfile) {
      return "false";
    }
    return "true";
  }

  submitHandler(event) {
    event.preventDefault();

    var currentInput = {
      siteID: this.state.siteID,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      size: this.state.size,
      beamwidth: this.state.beamwidth,
      azimuth: this.state.azimuth
    };
    let siteList = [...this.state.siteList, currentInput];
    this.setState({ siteList });
    this.setState({
      ...this.state,
      siteList,
      size: this.state.size,
      siteID: "",
      latitude: "",
      longitude: "",
      beamwidth: "0",
      azimuth: "0"
    });
  }
  render() {
    return (
      <div className="ui container" style={{ marginTop: "20px" }}>
        <form onSubmit={event => this.submitHandler(event)}>
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <label> SiteID </label>
                <input
                  type="text"
                  placeholder="SiteID"
                  name="siteID"
                  value={this.state.siteID}
                  onChange={event =>
                    this.setState({ siteID: event.target.value })
                  }
                />
              </div>
              <div className="field">
                <label> Latitude </label>
                <input
                  type="text"
                  placeholder="Latitude"
                  name="latitude"
                  value={this.state.latitude}
                  onChange={event =>
                    this.setState({ latitude: event.target.value })
                  }
                />
              </div>
              <div className="field">
                <label> Longitude </label>
                <input
                  type="text"
                  placeholder="Longitude"
                  name="longitude"
                  value={this.state.longitude}
                  onChange={event =>
                    this.setState({ longitude: event.target.value })
                  }
                />
              </div>

              <div className="field">
                <label> Beamwidth </label>
                <input
                  type="text"
                  placeholder="Beamwidth"
                  name="beamwidth"
                  value={this.state.beamwidth}
                  onChange={event =>
                    this.setState({ beamwidth: event.target.value })
                  }
                />
              </div>
              <div className="field">
                <label> Azimuth </label>
                <input
                  type="text"
                  placeholder="Azimuth"
                  name="azimuth"
                  value={this.state.azimuth}
                  onChange={event =>
                    this.setState({ azimuth: event.target.value })
                  }
                />
              </div>
              <div className="field">
                <label> Size </label>
                <input
                  type="text"
                  placeholder="Size"
                  name="size"
                  value={this.state.size}
                  onChange={event =>
                    this.setState({ size: event.target.value })
                  }
                />
              </div>
              <button className="ui button" type="Submit">
                Submit
              </button>
              <button
                className="ui button"
                type="button"
                onClick={() => this.setState({ siteList: [] })}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        <div className="item">
          <input
            type="file"
            id="file"
            onChange={event =>
              this.setState({ csvfile: event.target.files[0] })
            }
          />
          <button
            disabled={!this.state.csvfile}
            onClick={event => this.handleFile(event)}
          >
            Upload now!
          </button>
        </div>
        <br />
        <div>
          <Maps pins={this.state.siteList} />
        </div>
        <br />
        <div>
          <SiteTable sites={this.state.siteList} />
        </div>
      </div>
    );
  }
}

export default App;
