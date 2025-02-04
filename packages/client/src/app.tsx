import { Outlet, BrowserRouter, Routes, Route, Navigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/404";
import Home from "./pages/home";
import Location from "./pages/location";
import "./index.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="city/:id" element={<Location type="city" />} />
            <Route path="hotel/:id" element={<Location type="hotel" />} />
            <Route path="country/:id" element={<Location type="country" />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
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
