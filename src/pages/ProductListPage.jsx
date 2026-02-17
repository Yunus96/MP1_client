import ProductListing from "../components/ProductList";

function ProductListPage({ searchQuery }) {
  return(
    <>
        <ProductListing searchQuery={searchQuery}/>
    </>
  )
}

export default ProductListPage;
