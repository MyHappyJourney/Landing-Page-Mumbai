import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { PackageSection } from './components/PackageSection';
import { PackageModal } from './components/PackageModal';
import { QuoteModal } from './components/QuoteModal';
import { Itinerary } from './components/Itinerary';
import { InclusionsExclusions } from './components/InclusionsExclusions';
import { WhyBook } from './components/WhyBook';
import { Reviews } from './components/Reviews';
import { QuoteForm } from './components/QuoteForm';
import { FAQ } from './components/FAQ';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Footer } from './components/Footer';
import { PackageItem } from './types';

export default function App() {
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<PackageItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quotePackageId, setQuotePackageId] = useState<string>('pkg-6n7d');

  const openQuoteModal = (pkgId?: string) => {
    if (pkgId) {
      setQuotePackageId(pkgId);
    }
    // Close package details modal if open
    setSelectedPackageForModal(null);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-[#EBF2FF] selection:text-[#0B3996] pb-[72px] md:pb-0">
      
      {/* 1. Header */}
      <Header
        onQuoteClick={() => openQuoteModal()}
        onPackageSelect={(pkgId) => openQuoteModal(pkgId)}
      />

      <main>
        {/* 2. Hero Section */}
        <Hero onQuoteClick={() => openQuoteModal()} />

        {/* 3. Trust Strip */}
        <TrustStrip />

        {/* 4. Tour Itinerary (6N / 7D) */}
        <Itinerary />

        {/* 5. Choose Your Kerala Tour (Package Cards & Carousel) */}
        <PackageSection
          onViewDetails={(pkg) => setSelectedPackageForModal(pkg)}
          onGetQuote={(pkg) => openQuoteModal(pkg.id)}
        />

        {/* 6. Loved By 5000+ Happy Travellers (Customer Reviews) */}
        <Reviews />

        {/* 7. Package Inclusions & Exclusions */}
        <InclusionsExclusions />

        {/* 8. Why Book With MyHappyJourney */}
        <WhyBook />

        {/* 9. Get Your Customised Quote (Lead Form) */}
        <QuoteForm preselectedPackageId={quotePackageId} />

        {/* 10. Frequently Asked Questions (FAQs) */}
        <FAQ />
      </main>

      {/* 11. Footer */}
      <Footer onQuoteClick={() => openQuoteModal()} />

      {/* 12. Fixed Bottom Mobile CTA Bar */}
      <StickyMobileCTA onQuoteClick={() => openQuoteModal()} />

      {/* Package Details Modal */}
      <PackageModal
        pkg={selectedPackageForModal}
        onClose={() => setSelectedPackageForModal(null)}
        onGetQuote={(pkg) => openQuoteModal(pkg.id)}
      />

      {/* Quote Request Modal Pop-up */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedPackageId={quotePackageId}
      />

    </div>
  );
}
