import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";

import { getTeamMembers } from "../../lib/actions";

export default async function TeamPage() {
  const team = await getTeamMembers();
  return (
    <main className="bg-offwhite dark:bg-charcoal text-charcoal dark:text-offwhite transition-colors duration-500 min-h-screen">
      <Navbar />
      
      <section className="pt-40 pb-20 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <h1 className="font-serif text-6xl md:text-8xl font-thin tracking-tight mb-10 border-b border-charcoal/20 dark:border-offwhite/20 pb-10">
          THE VISIONARIES
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-charcoal/10 dark:bg-offwhite/10">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <h3 className="font-serif text-2xl mb-1">{member.name}</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60 dark:text-offwhite/60 mb-4">{member.role}</p>
              <p className="font-sans text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
