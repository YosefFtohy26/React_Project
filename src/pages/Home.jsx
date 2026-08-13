import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { StatsSection } from '../components/home/StatsSection';
import { NewsSection } from '../components/home/NewsSection';
import { AnnouncementsSection } from '../components/home/AnnouncementsSection';
import { ServicesSection } from '../components/home/ServicesSection';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <NewsSection />
      <AnnouncementsSection />
      <ServicesSection />
    </div>
  );
};

export default Home;
