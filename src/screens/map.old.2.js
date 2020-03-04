import React, { Fragment, useState, useContext, useCallback, useEffect } from 'react'
import { Map as MainMap, TileLayer, Marker } from 'react-leaflet';
// import plane from '../assets/paper-plane.svg';
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ShipContext } from '../context/ShipContext'

// https://staging.api.app.fleettracker.de/api

import {  iconShip  } from '../components/shipIcon';

export const Map = () => {
    const [ shipsIds, setShipsIds ] = useState([])
    const [ markers, setMarkers ] = useState([])
    // const [ markers, setMarkers ] = useState([
    //   // {
    //   //   name: "Cape Spencer",
    //   //   posx: 51.522968,
    //   //   posy: -0.108148
    //   // },
    //   // {
    //   //   name: "Cape Spencer 2",
    //   //   posx: 51.522968,
    //   //   posy: -0.108148
    //   // }
    //   [51.522968, -0.108148],
    //   [54.522968, -0.208148],
    //   [49.771496, 23.971092], // Lviv
    //   [51.771496, 26.971092],
    //   [55.771496, 28.971092],
    //   [45.771496, 10.971092],
    //   [49.375225, 14.595445]
    // ]);
    const {loading, request} = useHttp()
    const {token, isAuthenticated} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
      try {
        const fetched = await request('https://staging.api.app.fleettracker.de/api/ships', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        // console.log(fetched['hydra:member'])
        // console.log(fetched['hydra:member'][1]['name']) // Getting Name Example
        // console.log('Ship ID', fetched['hydra:member'][1]['@id'].slice(11, 15)) // Getting of ID example
        // console.log('Schedule ID:', fetched['hydra:member'][1]['schedules'][0]['@id'].slice(11, 15)) // Getting schedule ID 

        const shipIds = []
        const scheduleIds = []

        function getIds(item, index) {
          const scheduleId= item['schedules'][0]['@id'].slice(15, 19)
          shipIds.push(item['@id'].slice(11, 15))
          scheduleIds.push(scheduleId)
        }
        
        fetched['hydra:member'].forEach(getIds)
        console.log('Ship Ids:', shipIds)
        console.log('Schedule Ids:', scheduleIds)
        setShipsIds(shipIds)
        
        const shipsTest = []

        function getShipsTest(_id) {
          const func = async () => {
            const fetched = await request(`https://staging.api.app.fleettracker.de/api/fixed_objects/${_id}`, 'GET', null, {
              Authorization: `Bearer ${token}`
            })
          }
          shipsTest.push(fetched)
        }

        shipIds.forEach(getShipsTest)
        console.log('ShipsTest:', shipsTest)
        setMarkers(shipsTest)
        // console.log(markers)

      } catch (e) {
        console.log('Error:', e)
      }
    }, [token, request])

  //   const fetchIds = async () => {
  //     try {
  //         const fetched = await request('https://staging.api.app.fleettracker.de/api/ships', 'GET', null, {
  //             Authorization: `Bearer ${token}`
  //         })
  //         const shipIds = []

  //         const getIds = (item) => {
  //             const idKey = item['@id'].slice(11, 15)
  //             shipIds.push(idKey)
  //         }

  //         fetched['hydra:member'].forEach(getIds)

  //         const fetchSingleShip = (url, _id) => {
  //             fetch(`${url}${_id}`, {
  //                 method: 'GET',
  //                 headers: [
  //                     ["Content-Type", "application/json"],
  //                     ["Authorization", `Bearer ${token}`]
  //                 ], 
  //             }).then(res => res.json())
  //                 // .then(data => console.log(data))
  //                 // .then(data => fetchedmarkers.push(data))
  //         }

  //         const fetchedmarkers = []

  //         for(let _id of shipIds) {
  //           // console.log(_id)
  //           // fetch(`https://staging.api.app.fleettracker.de/api/ships/${_id}`, {
  //           //   method: 'GET',
  //           //   headers: [
  //           //     ["Content-Type", "application/json"],
  //           //     ["Authorization", `Bearer ${token}`]
  //           //   ], 
  //           // }).then(res => res.json())
       
  //           const fixedobjects = fetch(`https://staging.api.app.fleettracker.de/api/fixed_objects/${_id}`, {
  //             method: 'GET',
  //             headers: [
  //               ["Content-Type", "application/json"],
  //               ["Authorization", `Bearer ${token}`]
  //             ], 
  //           }).then(res => res.json())
  //           .then(data => {
  //             fetchedmarkers.push(data)
  //             setMarkers(fetchedmarkers)
  //             console.log(fetchedmarkers)
  //           })
  
  //           // .then(res => console.log(res))
  //           // 
  //           // fetchSingleShip('https://staging.api.app.fleettracker.de/api/fixed_objects/', _id)
  //         }

  //         // console.log('Markers:', markers)
  //         // console.log('Single:', fetchSingleShip)


  //     } catch (e) {
  //         console.log('Error:', e)
  //     }
  // }
  
  useEffect(() => {
    fetchLinks()
    // fetchIds()
  }, [fetchLinks])
  
  const hereCredentials = {
    // Test API   // appId: '5mvG1nfdWF66X7RF3PsB',    // apiKey: 'ptPpDquqCNnmE6FW7gUPz5ErHG-3TLLRZirSvOrxrHw',
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
              markers.map((i) => {
                return(
                <p className="Test coords" key={i.posx}>{i.posx} {i.posy}</p>
                )
              })
            }



            {
              markers.map((item, l) => {
                return (
                  <div key={l}>
                      <Link key={l} style={{ transform: 'rotate(45deg)' }} to='/about'>
                          {/* <Marker style={{ transform: 'rotate(45deg)' }} position={ item } icon={ iconShip } rotate={'45deg'}>
                          </Marker> */}
                      </Link>
                          {/* <p className="coords">{`${item.posx.toString().substring(0, item.posx.toString().length - 5)}.${
                            item.posx.toString().substr(item.posx.toString().length - 5)
                          }, ${item.posy.toString().substring(0, item.posy.toString().length - 5)}.${
                            item.posy.toString().substr(item.posy.toString().length - 5)
                          }`}</p> */}
                  </div>
                      // 51.522968, -0.108148
                      
                      // `${item.posx.slice(0, 2)}.${item.posx.slice(2, 15)}`, `${item.posy.slice(0, 2)}.${item.posy.slice(2, 15)}`
                      )
                    })
                  }
          </MainMap>
        </div>
    )
  }
  
  // https://staging.api.app.fleettracker.de/api/ships/1331
  // https://staging.api.app.fleettracker.de/api/fixed_objects/1334