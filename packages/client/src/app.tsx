import { Outlet, BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import City from "./pages/City";
import Hotel from "./pages/Hotel";
import Country from "./pages/Country";
import "./index.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="city/:id" element={<City />} />
            <Route path="hotel/:id" element={<Hotel />} />
            <Route path="country/:id" element={<Country />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const Layout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default App;
