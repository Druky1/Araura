
import CTA from "./_components/CTA";
import FAQ from "./_components/FAQ";
import Features from "./_components/Features";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonials";
import Footer from "./_components/Footer";
import { LoadingScreen } from "./_components/Loading-Screen";

export default function Home() {
  return (
    <>
    {/* <LoadingScreen/> */}
    <Header />
    <Hero/>
    <Features />
    <Testimonials/>
    <FAQ/>
    <CTA/>
    <Footer />
    </>
  )
}
