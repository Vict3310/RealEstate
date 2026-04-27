const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Properties
  await prisma.property.createMany({
    data: [
      {
        title: "The Glass Pavilion",
        location: "Beverly Hills, CA",
        price: "$24,000,000",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        video: "https://videos.pexels.com/video-files/5824703/5824703-uhd_2732_1440_24fps.mp4",
        isLarge: true,
        description: "An architectural masterpiece suspended above the city. The Glass Pavilion offers unparalleled 360-degree views, featuring seamless indoor-outdoor living, an infinity edge pool, and bespoke finishes crafted from the rarest materials.",
        beds: 6,
        baths: 8,
        sqft: 12500,
        yearBuilt: 2024,
        gallery: JSON.stringify([
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop",
        ])
      },
      {
        title: "Villa Blanc",
        location: "Miami Beach, FL",
        price: "$18,500,000",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
        video: "https://videos.pexels.com/video-files/7599727/7599727-uhd_2160_3840_30fps.mp4",
        isLarge: false,
        description: "A pristine waterfront sanctuary. Villa Blanc epitomizes Miami luxury with private dockage, soaring double-height ceilings, and a stark, beautiful minimalist design that lets the ocean take center stage.",
        beds: 5,
        baths: 6,
        sqft: 8200,
        yearBuilt: 2022,
        gallery: JSON.stringify([
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?q=80&w=2070&auto=format&fit=crop",
        ])
      },
      {
        title: "Alpine Retreat",
        location: "Aspen, CO",
        price: "$14,200,000",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1288&auto=format&fit=crop",
        video: "https://videos.pexels.com/video-files/8044238/8044238-uhd_2160_3840_25fps.mp4",
        isLarge: false,
        description: "Where rustic charm meets modern opulence. This ski-in/ski-out estate features reclaimed timber beams, a towering stone fireplace, and a private wellness spa overlooking the snow-capped peaks.",
        beds: 4,
        baths: 5,
        sqft: 6500,
        yearBuilt: 2020,
        gallery: JSON.stringify([
          "https://images.unsplash.com/photo-1600607688127-4c3e8cd8fc6f?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
        ])
      }
    ]
  });

  // Journal Articles
  await prisma.journalArticle.createMany({
    data: [
      {
        title: "The Return of Quiet Luxury in Architectural Design",
        category: "Design",
        date: "October 12, 2024",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        excerpt: "Exploring the shift away from ostentatious displays of wealth towards subtle, deeply considered craftsmanship in modern estates.",
      },
      {
        title: "Navigating the High-End Market: A 2025 Outlook",
        category: "Market Analysis",
        date: "September 28, 2024",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
        excerpt: "An exclusive look at where ultra-high-net-worth individuals are moving their real estate portfolios in the coming year.",
      },
      {
        title: "Curating the Perfect Wellness Spa at Home",
        category: "Lifestyle",
        date: "September 15, 2024",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
        excerpt: "How the world's best homes are bringing five-star wellness experiences directly into the private sphere.",
      }
    ]
  });

  // Team Members
  await prisma.teamMember.createMany({
    data: [
      {
        name: "Eleanor Vance",
        role: "Founder & Principal Broker",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
        bio: "With over two decades defining the pinnacle of luxury real estate, Eleanor curates portfolios for the world's most discerning clientele.",
      },
      {
        name: "Julian Sterling",
        role: "Director of Acquisitions",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
        bio: "Julian's precise market intuition and global network grant Obsidian clients exclusive access to whispering listings before they ever reach the market.",
      },
      {
        name: "Isabella Thorne",
        role: "Head of Private Estates",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
        bio: "An architect by trade, Isabella brings an unparalleled eye for structural integrity and design provenance to every high-value transaction.",
      }
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
