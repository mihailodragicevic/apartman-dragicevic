import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Amenities = lazy(() => import("./pages/Amenities"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EnglishHome = lazy(() => import("./pages/EnglishHome"));
const EnglishAmenities = lazy(() => import("./pages/EnglishAmenities"));

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Suspense fallback={<div className="min-h-screen bg-background" aria-hidden />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/en/" element={<EnglishHome />} />
        <Route path="/en/about/" element={<About />} />
        <Route path="/en/amenities/" element={<EnglishAmenities />} />
        <Route path="/en/gallery/" element={<Gallery />} />
        <Route path="/en/contact/" element={<Contact />} />
        <Route path="/o-nama" element={<About />} />
        <Route path="/sadrzaj" element={<Amenities />} />
        <Route path="/galerija" element={<Gallery />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
