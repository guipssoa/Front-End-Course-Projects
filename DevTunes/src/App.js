import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Album from './pages/album/:id/Album';
import Search from './pages/search/Search';
import Favorites from './pages/favorites/Favorites';
import ProfileEdit from './pages/profile/edit/ProfileEdit';
import Profile from './pages/profile/Profile';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } exact />
          <Route path="/search" component={ Search } exact />
          <Route path="/favorites" component={ Favorites } exact />
          <Route path="/album/:id" component={ Album } exact />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
