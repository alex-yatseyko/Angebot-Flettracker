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
    

    // const getid = async () => {
    //     try {
    //         const fetched = await fetch(`https://staging.api.app.fleettracker.de/api/ships/`, {
    //             method: 'GET',
    //             headers: [
    //                 ["Content-Type", "application/json"],
    //                 ["Authorization", `Bearer ${token}`]
    //             ], 
    //         })
    //         console.log(fetched)
    //         const shipIds = []

    //         const getIds = (item) => {
    //             const idKey = item['@id'].slice(11, 15)
    //             shipIds.push(idKey)
    //         }

    //         fetched['hydra:member'].forEach(getIds)
    //         setIds(shipIds)

    //         console.log(shipIds)
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }

    const fetchIds = /* useCallback( */async () => {
        try {
            const fetched = await request('https://staging.api.app.fleettracker.de/api/ships', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            // console.log(fetched)

            const shipIds = []

            const getIds = (item) => {
                const idKey = item['@id'].slice(11, 15)
                shipIds.push(idKey)
            }

            fetched['hydra:member'].forEach(getIds)
            setIds(shipIds)

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


    const fetchSingleShip2 = useCallback(
        async function getShip() {
            let ships = []

            const _id = TestIds[0]

            // console.log(token)

            fetch(`https://staging.api.app.fleettracker.de/api/ships/${_id}`, {
                    method: 'GET',
                    headers: [
                        ["Content-Type", "application/json"],
                        ["Authorization", `${token}`]
                    ], 
                })
            // for(let _id of TestIds) {
            //     fetch(`https://staging.api.app.fleettracker.de/api/ships/${_id}`, {
            //         method: 'GET',
            //         headers: [
            //             ["Content-Type", "application/json"],
            //             ["Authorization", `${token}`]
            //         ], 
            //     })
            //     // ships.push(ship)
            // }

            // console.log(ships)

            let res = await Promise.all(ships.map(results => results.json()))
            
            // console.log(results)
            // console.log(res)

            // .then(results.map(results => results.json()))
            // .then(data => console.log(data))

            // .then((data) => {console.log('Data', data)})

            // console.log('Ships', ships)
            // console.log('Results', results)
            // setSingleShips(results)
            // return results
            // console.log(results)
        }, [token, Ids]
    )


    const fetchSingleShip = useCallback( async () => { // https://staging.api.app.fleettracker.de/api/ships/1331
        try {
            // const singleShipsRequestLinks = Ids.map(id => {
            //     return(`https://staging.api.app.fleettracker.de/api/ships/${id}`)
            // })
            // console.log( singleShipsRequestLinks )

            const singleShipsRequestLinks = [
                'https://staging.api.app.fleettracker.de/api/ships/2880',
                // 'https://staging.api.app.fleettracker.de/api/ships/1926',
                // 'https://staging.api.app.fleettracker.de/api/ships/3472'
            ]
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${token}`);
            // console.log(myHeaders)

            Promise.all(singleShipsRequestLinks.map(u => fetch(`${u}`, {
                    method: 'GET', 
                    headers: myHeaders
                    // headers: [
                    //     ["Content-Type", "application/json"],
                    //     ["Authorization", `Bearer ${token}`]
                    //  ],
                })
            ))
                .then(response => Promise.all(response.map(res => res.json())))
                // .then((data) => {console.log(data)})
            // setSingleShips()
        } catch(e) {
            console.log(e)
        }
    }, [token, Ids])

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
