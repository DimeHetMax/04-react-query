import { Routes, Route } from "react-router-dom";
import HomePage from "../../Pages/HomePage/HomePage";
import SearchPage from "../../Pages/SearchPage/SearchPage";
const App = () => {
 
  return (
   <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="/products" element={<Products />} /> */}
      </Routes>
    </div>
  );
};

export default App;
