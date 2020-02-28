import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AuthScreen } from './screens/AuthScreen'
import { Map } from './screens/Map'
import { Settings } from './screens/Settings'
import { List } from './screens/List'
import { DetailPage } from './screens/DetailPage'

import { CSSTransition, TransitionGroup} from 'react-transition-group';

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            // <TransitionGroup>
            // <CSSTransition 
            //     timeout={300} 
            //     classNames="fade"
            //   >
                <Switch>
                    <Route path="/map" exact>
                        <Map />
                    </Route>
                    <Route path="/list" exact>
                        <List />
                    </Route>
                    <Route path="/settings" exact>
                        <Settings />
                    </Route>
                    <Route path="/ship/:id">
                        <DetailPage />
                    </Route>
                    <Redirect to="/map" />
                </Switch>
            {/* </CSSTransition></TransitionGroup> */}
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthScreen />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}