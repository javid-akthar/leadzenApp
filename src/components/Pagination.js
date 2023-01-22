import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { jobActions } from "../store/jobData";
import './pagination.css'

function Pagination(props) {
  const dispatch = useDispatch();
  const pageNo = useSelector((state) => state.counter.pageNo);
  const paginationArray = useSelector((state) => state.counter.paginationArray);

  // this function triggers action to decrease the page count by 1
  function decreasePageNo() {
    dispatch(jobActions.decreasePage());
  }
  // this function triggers action to increase the page count by 1
  function increasePageNo() {
    dispatch(jobActions.increasePage());
  }
  // this function triggers action to change the pageNo
  function changePageNo(pageNo) {
    dispatch(jobActions.changePageNo(pageNo));
  }

  // generating page traversing button dynamically
  let ele = paginationArray.map((item, index) => {
    let selectedPage = "";
    if(pageNo === item){
      selectedPage = "selectedPage";
    }
    return (
      <li key={index + 10} className="page-item" >
        <div className="page-link" onClick={() => changePageNo(item)} id={selectedPage}>
          {item}
        </div>
      </li>
    );
  });

  // building component with the traversing button created dynamically
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center" id="cursorhover">
        <li className="page-item" >
          <div className="page-link" onClick={decreasePageNo}>
          &lt;
          </div>
        </li>
        {ele}
        <li className="page-item">
          <div className="page-link" onClick={increasePageNo}>
          &gt;
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
