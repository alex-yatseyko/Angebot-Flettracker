import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { ShipContext } from './context/ShipContext'

import { BottomNavigation } from './components/BottomNavigation'
import './App.css';

import { useRoutes } from './routes'

function App() {
  const {token, refresh_token, login, logout } = useAuth()
  const isAuthenticated = !!token  
  // const isAuthenticated = false;
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, refresh_token, isAuthenticated
    }}>
      <ShipContext.Provider value={{
        // ships
      }}>
        <Router>
          <div className="App">
            { isAuthenticated && <BottomNavigation />}
              { routes }
          </div>
        </Router>
      </ShipContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
