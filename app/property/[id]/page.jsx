import { getPropertyById, getProperties } from "../../../lib/actions";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import VideoHeader from "../../../components/VideoHeader";
import AnimatedPrice from "../../../components/AnimatedPrice";
import ImageSlider from "../../../components/ImageSlider";
import MortgageCalculator from "../../../components/MortgageCalculator";
import Image from "next/image";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await getPropertyById(id);
  
  if (!property) return { title: 'Not Found' };

  return {
    title: `${property.title} | Obsidian Estates`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [{ url: property.image }],
    },
  };
}

export default async function PropertyPage({ params }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  const detailItems = [
    { label: "Beds", value: property.beds },
    { label: "Baths", value: property.baths },
    { label: "Sq Ft", value: property.sqft.toLocaleString() },
    { label: "Year Built", value: property.yearBuilt },
  ];

  return (
    <main className="bg-offwhite dark:bg-charcoal text-charcoal dark:text-offwhite transition-colors duration-500">
      <Navbar />
      
      <a 
        href="/#estates" 
        className="fixed bottom-10 right-10 z-50 bg-charcoal dark:bg-offwhite text-offwhite dark:text-charcoal font-sans text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform backdrop-blur-md"
      >
        &larr; Directory
      </a>

      <VideoHeader videoSrc={property.video} title={property.title} />
      
      <div className="px-4 md:px-10 lg:px-20 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 border-b border-charcoal/20 dark:border-offwhite/20 pb-10 mb-20">
          <div className="max-w-2xl">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] mb-4 text-charcoal/60 dark:text-offwhite/60">The Philosophy</h2>
            <p className="font-serif text-2xl md:text-4xl leading-relaxed font-light">
              {property.description}
            </p>
          </div>
          <div className="flex flex-col gap-8 min-w-[200px]">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 mb-1">Price</p>
              <div className="font-serif text-3xl"><AnimatedPrice value={property.price} /></div>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 mb-1">Location</p>
              <p className="font-sans font-medium">{property.location}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 mb-32">
          {detailItems.map((item) => (
            <div key={item.label} className="border-l border-charcoal/20 dark:border-offwhite/20 pl-4">
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 mb-2">{item.label}</p>
              <p className="font-serif text-3xl md:text-4xl">{item.value}</p>
            </div>
          ))}
        </div>

        <MortgageCalculator price={property.price} />

        <div className="mt-32 mb-20 w-full overflow-hidden">
          <h3 className="font-serif text-4xl mb-10 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">Gallery</h3>
          <div className="pl-4 md:pl-10 lg:pl-20">
            <ImageSlider images={property.gallery} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
