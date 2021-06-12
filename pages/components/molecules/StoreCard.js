
const StoreCard = ({ stores }) => {
  console.log(stores)
  const Markup = stores.data.map((store) => {
    return (
      <div key={store.storeID}>
        {store.storeID}
        <br />
        {store.storeName}
        <br />
        'Banner'<img src={`https://www.cheapshark.com/${store.images.banner}`} />
        <br />
        'Icon'<img src={`https://www.cheapshark.com/${store.images.icon}`} />
        <br />
        'Logo'<img src={`https://www.cheapshark.com/${store.images.logo}`} />
      </div>
    )
  })
  console.log(Markup)

  return (
    <>
      {Markup}
    </>
  )
}

export default StoreCard
