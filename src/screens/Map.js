import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Map as MainMap, TileLayer, Marker } from 'react-leaflet';
// import plane from '../assets/paper-plane.svg';
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

// https://staging.api.app.fleettracker.de/api

import {  iconShip  } from '../components/shipIcon';

export const Map = () => {
    const [ data2, setData2 ] = useState([])
    const [ shipsIds, setShipsIds ] = useState([])
    const [ markers, setMarkers ] = useState([
      [51.522968, -0.108148],
      [54.522968, -0.208148],
      [49.771496, 23.971092], // Lviv
      [51.771496, 26.971092],
      [55.771496, 28.971092],
      [45.771496, 10.971092],
      [49.375225, 14.595445]
    ]);
    const {loading, request} = useHttp()
    const {token, isAuthenticated} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
      try {
        const fetched = await request('https://staging.api.app.fleettracker.de/api/ships', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setData2(fetched)
        // console.log(token)
        console.log(fetched['hydra:member'])
        console.log(fetched['hydra:member'][1]) // Getting single ship example
        console.log(fetched['hydra:member'][1]['name']) // Getting Name Example
        console.log('Ship ID', fetched['hydra:member'][1]['@id'].slice(11, 15)) // Getting of ID example
        console.log('Schedule ID:', fetched['hydra:member'][1]['schedules'][0]['@id'].slice(11, 15)) // Getting schedule ID 
        console.log(fetched)
        console.log(isAuthenticated)

        const shipIds = []
        const scheduleIds = []

        function getIds(item, index) {
          const scheduleId= item['schedules'][0]['@id'].slice(15, 19)
          console.log(index, ":", item) 
          console.log(`${index} id:`, item['@id'].slice(11, 15)) 
          console.log(`${index} schedule id:`, item['schedules'][0]['@id'].slice(15, 19))
          shipIds.push(item['@id'].slice(11, 15))
          scheduleIds.push(scheduleId)
        }
        
        fetched['hydra:member'].forEach(getIds)
        console.log('Ship Ids:', shipIds)
        console.log('Schedule Ids:', scheduleIds)
        setShipsIds(shipIds)
      } catch (e) {
        console.log('Error:', e)
      }
    }, [token, request])

    // https://staging.api.app.fleettracker.de/api/ships/1331
    // https://staging.api.app.fleettracker.de/api/fixed_objects/1334

    useEffect(() => {
      fetchLinks()
      // console.log(data2)
    }, [fetchLinks])

    const hereCredentials = {
        // Test API
      // appId: '5mvG1nfdWF66X7RF3PsB',  
      // apiKey: 'ptPpDquqCNnmE6FW7gUPz5ErHG-3TLLRZirSvOrxrHw',
      appId: 'T94boxXXrApFtc58WmGz',
      apiKey: 'aJYTveJijLx5bMV5Qt4-pXKHvbH9CblzqBiq3dRZRDA'
    }

    const themes = [
      'normal.day',
      'reduced.night'
    ]

    const hereTileUrl = `https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${themes[0]}/{z}/{x}/{y}/256/png8?apiKey=${ hereCredentials.apiKey}&app_id=${hereCredentials.appId}`
  
    const center = [51.522968, -0.108148]

    const zoom = 5;

    return (
        <div>
          <header>
            <input type="text" className="headerInput" placeholder="Search Vessel or Ship Group..."/>
            {/* <div onClick={ fetchLinks } >Button</div> */}
            {shipsIds.map((i) => {
              return(
              <p key={i}>
                {/* {i} */}
              </p>
              )
            })}
          </header>
          <MainMap
            center={center}
            zoom={zoom}
          >  
            <TileLayer
              // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              url={ hereTileUrl }
            />


            {
              markers.map((item, l) => {
                  return (
                      <Link key={l} style={{ transform: 'rotate(45deg)' }} to='/about'>
                          <Marker style={{ transform: 'rotate(45deg)' }} position={ item } icon={ iconShip } rotate={'45deg'}>
                          </Marker>
                      </Link>
                  )
              })
            }
          </MainMap>
        </div>
    )
}
