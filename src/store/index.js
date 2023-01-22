import { configureStore } from '@reduxjs/toolkit';

import jobReducer from './jobData';

// configuring the store
const store = configureStore({
    reducer: { counter: jobReducer},
});



export default store;