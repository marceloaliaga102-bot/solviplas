import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TutorialSection } from './components/TutorialSection';
import { ProductsSection } from './components/ProductsSection';
import { ProjectOverview } from './components/ProjectOverview';
import { ProblemSection } from './components/ProblemSection';
import { RecipeProcessSection } from './components/RecipeProcessSection';
import { TimelineSection } from './components/TimelineSection';
import { ResultsSection } from './components/ResultsSection';
import { MediaGallery } from './components/MediaGallery';
import { TeamSection } from './components/TeamSection';
import { CustomSectionRenderer } from './components/CustomSectionRenderer';
import { CommentsSection } from './components/CommentsSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { NewSectionModal } from './components/CanvaEditor/NewSectionModal';
import { CanvaToolbar } from './components/CanvaEditor/CanvaToolbar';

const MainContent: React.FC = () => {
  const { customSections } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Quick Navigation Sticky Bar with Horizontal Mobile Swiping */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero with sparkling animated particles & live editable metrics */}
        <Hero />

        {/* 2. Step-by-Step Bioplastic Preparation Tutorial (near the top) */}
        <TutorialSection />

        {/* 3. Products Catalog with Interactive Ingredients & Steps Details */}
        <ProductsSection />

        {/* 4. Project Overview */}
        <ProjectOverview />

        {/* 5. Ecological Problem & Green Solution */}
        <ProblemSection />

        {/* 6. Classic Recipe & Interactive Simulator */}
        <RecipeProcessSection />

        {/* 7. Action Timeline */}
        <TimelineSection />

        {/* 8. Impact Results & Validation */}
        <ResultsSection />

        {/* 9. Multimedia Gallery (Images and Videos) */}
        <MediaGallery />

        {/* 10. Research & Development Team */}
        <TeamSection />

        {/* 11. Dynamically Created Custom Sections */}
        {customSections.map((section) => (
          <CustomSectionRenderer key={section.id} section={section} />
        ))}

        {/* 12. Community Comments & Questions */}
        <CommentsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* In-Place Canva Floating Editor Toolbar (Only for Admin) */}
      <CanvaToolbar />

      {/* Section Creator Modal */}
      <NewSectionModal />

      {/* User Login/Register Modal (Clean switching, no clues of owner) */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
