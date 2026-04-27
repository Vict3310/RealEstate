import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import { ThemeProvider } from '../components/ThemeProvider';
import { CurrencyProvider } from '../components/CurrencyProvider';
import ScrollProgress from '../components/ScrollProgress';
import CustomCursor from '../components/CustomCursor';
import PageTransition from '../components/PageTransition';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'Obsidian | Quiet Luxury Real Estate',
  description: 'A masterpiece of modern architecture. Exclusive estates for the discerning few.',
  openGraph: {
    title: 'Obsidian | Quiet Luxury Real Estate',
    description: 'Exclusive estates for the discerning few.',
    url: 'https://obsidian-estates.com',
    siteName: 'Obsidian',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Obsidian | Quiet Luxury Real Estate',
    description: 'Exclusive estates for the discerning few.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-offwhite dark:bg-charcoal text-charcoal dark:text-offwhite transition-colors duration-500" suppressHydrationWarning>
        <ThemeProvider>
          <CurrencyProvider>
            <PageTransition />
            <SmoothScroll>
              <CustomCursor />
              <ScrollProgress />
              {children}
            </SmoothScroll>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
