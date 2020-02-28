import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Timeline, TimelineEvent } from 'react-event-timeline'
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const List = () => {
  const [ data2, setData2 ] = useState([])
  const [ data3, setData3 ] = useState([])
    const [ships, setShips] = useState([
        {name: 'MV OCTOPUS', capt: 'A.Kirk', places: [], key: '1'},
        {name: 'MV TURTOISE', capt: 'J.Doe', places: [], key: '2'},
        {name: 'MV STARFISH', capt: 'A.Ace', places: [], key: '3'},
        {name: 'MV WALRUS', capt: 'A.Sonething', places: [], key: '4'},
        {name: 'MV SEAGULL', capt: 'A.Whatever', places: [], key: '5'},
        {name: 'MV PELICAN', capt: 'A.Yatseyko', places: [], key: '6'},
        {name: 'MV OCTOPUS', capt: 'A.Kirk', places: [], key: '7'},
        {name: 'MV TURTOISE', capt: 'J.Doe', places: [], key: '8'},
        {name: 'MV STARFISH', capt: 'A.Ace', places: [], key: '9'},
        {name: 'MV WALRUS', capt: 'A.Sonething', places: [], key: '10'},
        {name: 'MV SEAGULL', capt: 'A.Whatever', places: [], key: '11'},
        {name: 'MV PELICAN', capt: 'A.Yatseyko', places: [], key: '12'}
      ])

      const {loading, request} = useHttp()
      const {token} = useContext(AuthContext)
  
      const fetchShips = useCallback(async () => {
        try {
          const fetched = await request('https://staging.api.app.fleettracker.de/api/ships', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setData2(fetched)
          // console.log(token)
          console.log(fetched['hydra:member'])
          // console.log(data2)
        } catch (e) {
          console.log('Error:', e)
        }
      }, [token, request])
  
      // const fetchLinks = useCallback(async () => {
      //   try {
      //     const fetched3 = await request('https://staging.api.app.fleettracker.de/api/future_schedule_entries', 'GET', null, {
      //       Authorization: `Bearer ${token}`
      //     })
      //     setData3(fetched3)
      //     console.log(token)
      //     console.log(fetched3)
      //     // console.log(data2)
      //   } catch (e) {
      //     console.log('Error:', e)
      //   }
      // }, [token, request])

      useEffect(() => {
        fetchShips()
        console.log(data2)
        // fetchLinks()
        // console.log(data3)
      }, [fetchShips])

    return (
        <div>
            <header>
                <input type="text" className="headerInput" placeholder="Search Vessel or Ship Group..."/>
            </header>
            {/* {data2.map(ship => {
              return(
                <p>{ship.name}</p>
              )
            })} */}

            { ships.map((ship) => {
          return (
            <div className="ship" key={ ship.key }>
              <div className="ship-details"> 
                <b>{ship.name}</b>
                <p>Capt. {ship.capt}</p>
              </div>
              <div className="timeline-wrapper"> 
              <Timeline>
                <TimelineEvent title="John Doe"

                />
              </Timeline>     
              <Timeline>
                <TimelineEvent title="John Doe"
                          
                />
              </Timeline>         
              </div>
            </div>
          )
        }) }
        </div>
    )
}
