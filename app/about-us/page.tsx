import Banner from "@/public/assets/images/About-US-Bannerjpg.webp";
import Image from "next/image";
import Features from "../_components/HomePage/Features";
import AboutSection from "./AboutSection";

function page() {
  return (
    <div>
      <div className="container relative h-72 w-full">
        <Image
          src={Banner}
          alt="about us banner"
          placeholder="blur"
          className="object-cover brightness-75"
          fill
        />
      </div>
      <AboutSection />
      <Features className="bg-zinc-50" />
    </div>
  );
}

export default page;
