import { createSlice } from '@reduxjs/toolkit';


// using react redux for managing the store

// defining the initial state
const initialJobState = { jobList : [], pageNo : 1, noOfItemsPerPage: 10, 
  totalPages: 0 , visibleJobList:[], paginationArray: [1,2,3,4]};

  // defining the actions
const jobSlice = createSlice({
  name: 'counter',
  initialState: initialJobState,
  reducers: {
    // to update the jobList with the value we got from api call
    updateJobList(state, action){
      state.jobList = action.payload;
      let firstElement = (state.pageNo*state.noOfItemsPerPage)-state.noOfItemsPerPage;
      let lastElement = firstElement+ state.noOfItemsPerPage;
      if(lastElement >= state.jobList.length){
        lastElement = state.jobList.length - 1;
      }
      state.visibleJobList = state.jobList.slice(firstElement,lastElement);
      state.totalPages = Math.ceil(state.jobList.length/state.noOfItemsPerPage);
    },increasePage(state){
      // to increase the page count no
      if(state.pageNo >= state.totalPages){
        return;
      }
      state.pageNo++;
      let firstElement = (state.pageNo*state.noOfItemsPerPage)-state.noOfItemsPerPage;
      let lastElement = firstElement+ state.noOfItemsPerPage;
      if(lastElement >= state.jobList.length){
        lastElement = state.jobList.length - 1;
      }
      state.visibleJobList = state.jobList.slice(firstElement,lastElement);
      state.paginationArray = paginationArrayDerivation(state.pageNo, state.totalPages);
    }
    ,decreasePage(state){
      // function to decrease the page count no
      if(state.pageNo === 1){
        return;
      }
      state.pageNo--;
      let firstElement = (state.pageNo*state.noOfItemsPerPage)-state.noOfItemsPerPage;
      let lastElement = firstElement+ state.noOfItemsPerPage;
      if(lastElement >= state.jobList.length){
        lastElement = state.jobList.length - 1;
      }
      state.visibleJobList = state.jobList.slice(firstElement,lastElement);
      state.paginationArray = paginationArrayDerivation(state.pageNo, state.totalPages);
    }
    , changePageNo(state, action){
      // function to change the page count no
      if(action.payload<0 || action.payload>state.totalPages){
        return;
      }
      state.pageNo = action.payload;
      let firstElement = (state.pageNo*state.noOfItemsPerPage)-state.noOfItemsPerPage;
      let lastElement = firstElement+ state.noOfItemsPerPage;
      if(lastElement >= state.jobList.length){
        lastElement = state.jobList.length - 1;
      }
      state.visibleJobList = state.jobList.slice(firstElement,lastElement);
      state.paginationArray = paginationArrayDerivation(state.pageNo, state.totalPages);
    }
  },
});

// this function derives the page traversal button the user have to be displayed
function paginationArrayDerivation(pageNo, totalPages){
  let arr = [];
  let count=0;
  if(pageNo > 1){
    arr.push(pageNo-1);
    count++;
  }
  if(pageNo<=totalPages && pageNo>=0){
    arr.push(pageNo);
    count++;
  }
  for(let i=pageNo+1; i<=totalPages; i++){
    if(count>=4){
      break;
    }
    arr.push(i);
    count++;
  }
  return arr;
}

// exporting actions
export const jobActions = jobSlice.actions;

export default jobSlice.reducer;