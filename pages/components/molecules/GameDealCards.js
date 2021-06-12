import { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const GameDealCards = ({ provider }) => {
  useEffect(() => {
    try {
      const url = 'http://localhost:8080/getDeals'
      axios.post(url, { storeID: provider }).then(result => {
        console.log(result)
      })
    } catch (e) {
      console.log(e)
    }
  }, [provider])
  return (
    <>

    </>
  )
}

export default GameDealCards
