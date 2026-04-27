import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StorySection from "../components/StorySection";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";

import PreLoader from "../components/PreLoader";

import Accolades from "../components/Accolades";
import HomeAnimations from "../components/HomeAnimations";

export default function Home() {

  return (
    <main className="relative min-h-screen bg-offwhite dark:bg-charcoal text-charcoal dark:text-offwhite font-sans transition-colors duration-500">
      <HomeAnimations />
      <PreLoader />
      <Navbar />
      <HeroSection />
      <StorySection />
      <FeaturedProperties />
      <Accolades />
      <Footer />
    </main>
  );
}
