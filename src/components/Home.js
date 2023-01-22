import React, { useEffect } from "react";
// import https from 'https';
import { useSelector, useDispatch } from "react-redux";
import { jobActions } from "../store/jobData";
import Pagination from "./Pagination";
import "./Home.css";
import Parser from "html-react-parser";
import Skills from "./Skills";
import {jobData, jobFlexStyle, flexCenteringStyle, viewProfileBtn} from './HomeCSSObj'

function Home(props) {
  const dispatch = useDispatch();
  // importing the jobList from store
  const visibleJobList = useSelector((state) => state.counter.visibleJobList);
  let ele = null;
  
  // this method created list of jobs for the selected pageNo
  if (visibleJobList) {
    ele = visibleJobList.map((job, index) => {
      let title = null;
      let temp1 = "(";
      if (job.title) {
        title = job.title;
        let titleArr = title.split("/");
        title = titleArr[0];
        if (title.indexOf(temp1) >= 0)
          title = title.substring(0, title.indexOf(temp1));
      }
      let uniqueId = new Date().getTime() + index;
      return (
        <div key={uniqueId}>
          <div
            className="d-flex flex-row flex-wrap justify-content-center"
            style={jobFlexStyle}
          >
            <div style={jobData} className="demo">
              <h6>{job.company_name}</h6>
            </div>
            <div style={jobData} className="demo">
              <h6>Profile</h6>
              {title}
            </div>
            <div style={jobData} className="demo">
              <h6>Location</h6>
              {job.location}
            </div>
            <Skills tags={job.tags} />
            <div style={jobData} className="demo">
              <p>
                <button
                  className="btn btn-primary collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target={"#collapseExample" + index + uniqueId}
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  style={viewProfileBtn}
                ></button>
              </p>
            </div>
          </div>
          <div>
            <div className="collapse" id={"collapseExample" + index + uniqueId}>
              <div className="card card-body" style={flexCenteringStyle}>
                <div className="d-flex flex-column">
                  {Parser(job.description)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  // using useEffect to call the Job listing API
  useEffect( ()=> {
    apiCallingFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calling the job get api
  async function apiCallingFunction() {
    try {
      // calling the job api
      const url = "https://www.arbeitnow.com/api/job-board-api";
      let response = await fetch(url);
      response = await response.json();
      console.log(response.data);
      dispatch(jobActions.updateJobList(response.data));
    } catch (err) {
      console.log("*** Error in Fetching GET request ***", err);
    }
  }

  // building component with the data got form api
  //  and based up on the selected page
  return (
    <>
      <div key="job-list" className="d-flex flex-column">
        {ele}
      </div>
      <Pagination />
    </>
  );
}

export default Home;
