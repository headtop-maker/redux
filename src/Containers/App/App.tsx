import React from "react";
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPageContainer from "../RegistrationPageContainer";
import AuthPageContainer from "../AuthPageContainer";
import MainPageContainer from "../MainPageContainer";
import BlogPageContainer from "../BlogPageContainer";
import ProfilePageContainer from "../ProfilePageContainer";

function App() {
  return (
    <>
      <Route exact path='/' component={MainPageContainer} />
      <Route exact path='/auth' component={AuthPageContainer} />
      <Route exact path='/reg' component={RegistrationPageContainer} />
      <Route exact path='/blog' component={BlogPageContainer} />
      <Route exact path='/profile' component={ProfilePageContainer} />
    </>
  );
}

export default App;
