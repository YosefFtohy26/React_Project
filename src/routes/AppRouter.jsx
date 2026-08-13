import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Departments from '../pages/Departments';
import DepartmentDetails from '../pages/DepartmentDetails';
import Programs from '../pages/Programs';
import News from '../pages/News';
import NewsDetails from '../pages/NewsDetails';
import Announcements from '../pages/Announcements';
import Faculty from '../pages/Faculty';
import FacultyDetails from '../pages/FacultyDetails';
import Services from '../pages/Services';
import Events from '../pages/Events';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="departments" element={<Departments />} />
          <Route path="departments/:id" element={<DepartmentDetails />} />
          <Route path="programs" element={<Programs />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetails />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="faculty/:id" element={<FacultyDetails />} />
          <Route path="services" element={<Services />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};