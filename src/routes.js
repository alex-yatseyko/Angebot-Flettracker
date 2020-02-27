import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AuthScreen } from './screens/AuthScreen'
import { Map } from './screens/Map'
import { Settings } from './screens/Settings'
import { List } from './screens/List'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
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
                <Redirect to="/map" />
            </Switch>
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