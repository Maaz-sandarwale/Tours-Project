import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import axios from 'axios'
import styles from './style.css'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [tour, setTour] = useState([])
  const [load, setLoad] = useState(true)
  const [error, setError] = useState(false)
  const [showmore, setShowmore] = useState(false)

  useEffect(() => {
    axios.get(url).then((res) => {
      if (res.status >= 200 && res.status <= 299) {
        console.log(res.data)
        setTour(res.data)
        setLoad(false)

      }
    }).catch(function (err) {
      setError(true)
      setLoad(false)
      console.log(err)
    })
  }, [])

  const removeTour = (id) => {
    const newTour = tour.filter((item) => {
      return item.id !== id
    })
    setTour(newTour)
    console.log(newTour)
  }

  return (
    <>
      {load ? <Loading /> : <h2 className='heading'>Our tour</h2>}
      {error ?
        <h2 className='error'>Error while fetching the data</h2>
        :
        (
          <div>

            {tour.map((item) => {
              const { id, name, info, image, price } = item

              return (
                <div key={id} className='container'>
                  <div className='card'>
                    <img src={image} alt={name} className='card-img-top' />
                    <section className='content'>
                      <h3 className='card-title'>{name}</h3>
                      <h4 className='card-text'>{price}</h4>
                      {showmore ? info : `${info.substring(0, 100)}`}
                      <button className='showbtn' onClick={() => setShowmore(!showmore)}>{showmore ? "Showless" : "Showmore"}</button>

                    </section>
                    <button className='btn' onClick={() => removeTour(id)}>Not interested</button>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }
      {(tour.length === 0 && !load) && <h2 className='error'>Bass itna hi hai</h2>}
    </>
  )
}

export default App
