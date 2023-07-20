import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";
// import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <Navbar />
      <ProductList />
      {/* <Link to="/admin">admin</Link> for test */}
    </>
  );
};

export default Home;
