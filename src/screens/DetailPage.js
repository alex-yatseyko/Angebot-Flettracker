import React, { useEffect, useState, useContext, useCallback } from 'react'
// import { ShipContext } from '../context/ShipContext'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'



export const DetailPage = () => {
    const [ Ids, setIds ] = useState([])
    const [ SingleShips, setSingleShips ] = useState([])

    const { token, isAuthenticated } = useContext(AuthContext)
    // const { ships, shipsIds } = useContext(ShipContext)
    const { request } = useHttp()
    

    const fetchIds = /* useCallback( */async () => {
        try {
            const fetched = await request('https://staging.api.app.fleettracker.de/api/ships', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            const shipIds = []

            const getIds = (item) => {
                const idKey = item['@id'].slice(11, 15)
                shipIds.push(idKey)
            }

            fetched['hydra:member'].forEach(getIds)
            // setIds(shipIds)

            // console.log(shipIds)

            const fetchSingleShip = (url, _id) => {
                fetch(`${url}${_id}`, {
                    method: 'GET',
                    headers: [
                        ["Content-Type", "application/json"],
                        ["Authorization", `Bearer ${token}`]
                    ], 
                }).then(res => res.json())
                    .then(data => console.log(data))
            }

            for(let _id of shipIds) {
                // console.log(_id)
                fetch(`https://staging.api.app.fleettracker.de/api/ships/${_id}`, {
                    method: 'GET',
                    headers: [
                        ["Content-Type", "application/json"],
                        ["Authorization", `Bearer ${token}`]
                    ], 
                }).then(res => res.json())
                    // .then(data => console.log(data))
                fetchSingleShip('https://staging.api.app.fleettracker.de/api/fixed_objects/', _id)
            }


        } catch (e) {
            console.log('Error:', e)
        }
    }/*, [token, request]) */

    useEffect(() => {
        fetchIds()

        // getid()

        // fetchSingleShip3()
        // fetchSingleShip2()
        // this.fetchSingleShip2()
        // console.log(SingleShips)
    }, [])


    return (
        <div>
            Details
            {
                Ids.map(e => {
                    return(
                        <p key={e}>{e}</p>
                    )
                })
            }
        </div>
    )
}
