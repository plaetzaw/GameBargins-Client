import { useEffect } from 'react'
import GameDealsCard from '../molecules/GameDealCards'

const SearchResults = ({ searchData }) => {
  useEffect(() => {

  }, [searchData.length])

  //   const Markup = searchData.map((game) => {
  //     return (
  //       <div key={game.dealID}>
  //         {game.title}
  //       </div>
  //     )
  //   })
  return (
    <>
      {/* {Markup} */}
      <GameDealsCard deals={searchData} />
    </>
  )
}

export default SearchResults
