import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api'

const App = () => {
  const [places, setPlaces] = useState([])

  const [coordinates, setCoordinates] = useState({})

  const [bounds, setBounds] = useState({})

   const [weatherData, setWeatherData] = useState([])
   const [filteredPlaces, setFilteredPlaces] = useState([])

  const [childClicked, setChildClicked] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude })
      }
    )
  }, [])

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating)

    setFilteredPlaces(filtered)
  }, [rating])

  useEffect(() => {
    setIsLoading(true)
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      console.log(data)
      setPlaces(data)
      setIsLoading(false)
    })
  }, [type, coordinates, bounds])
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App

// import React, { useRef, createRef, useState } from 'react'
// import ReactDOM from 'react-dom'

// function App() {
//   const [renderIndex, setRenderIndex] = useState(1)
//   const refFromUseRef = useRef()
//   const refFromCreateRef = createRef()
//   if (!refFromUseRef.current) {
//     refFromUseRef.current = renderIndex
//   }
//   if (!refFromCreateRef.current) {
//     refFromCreateRef.current = renderIndex
//   }
//   return (
//     <div className='App'>
//       Current render index: {renderIndex}
//       <br />
//       First render index remembered within refFromUseRef.current:
//       {refFromUseRef.current}
//       <br />
//       First render index unsuccessfully remembered within
//       refFromCreateRef.current:
//       {refFromCreateRef.current}
//       <br />
//       <button onClick={() => setRenderIndex((prev) => prev + 1)}>
//         Cause re-render
//       </button>
//     </div>
//   )
// }

// export default App
