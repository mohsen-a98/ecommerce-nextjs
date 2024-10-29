import Image from "next/image";
import Image1 from "@/public/assets/images/about-1.webp";
import Image2 from "@/public/assets/images/about-2.webp";

function AboutSection() {
  return (
    <section className="container mt-5 flex flex-col gap-20 py-14 lg:gap-32">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="flex flex-col gap-4">
          <h2 className="mb-4 text-2xl font-semibold">About Our Store</h2>
          <p className="text-justify leading-7 text-neutral-black-700">
            Our store was founded with the goal of providing high-quality
            products and an enjoyable, seamless shopping experience. We strive
            to offer a diverse range of items at competitive prices along with
            exceptional customer service.
          </p>
          <p className="text-justify leading-7 text-neutral-black-700">
            From the moment you visit our site to the completion of your
            purchase, our support team is here to ensure a flawless experience.
            With a satisfaction guarantee, fast shipping, and full-time support,
            we are dedicated to your satisfaction.
          </p>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded">
          <Image
            src={Image1}
            fill
            placeholder="blur"
            alt="about us"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="relative order-1 h-72 w-full overflow-hidden rounded lg:order-none">
          <Image
            src={Image2}
            fill
            placeholder="blur"
            alt="about us"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="mb-4 text-2xl font-semibold">Why Choose Us?</h2>
          <p className="text-justify leading-7 text-neutral-black-700">
            Committed to quality and customer loyalty, we take pride in offering
            only the best. By carefully selecting suppliers and presenting a
            wide variety of products, we strive to meet all your unique needs.
          </p>
          <p className="text-justify leading-7 text-neutral-black-700">
            We believe that online shopping should be simple, safe, and fast. To
            that end, we employ the latest technologies to enhance security and
            streamline the shopping process, ensuring easy payment and quick
            delivery for your peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
