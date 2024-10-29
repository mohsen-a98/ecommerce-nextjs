import Banner from "@/public/assets/images/contact-us-banner.webp";
import { Clock4, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import ContactForm from "./ContactForm";

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

      <section className="container mt-5 flex flex-col gap-20 border-b border-b-neutral-white-200 py-14 lg:gap-32">
        <div className="mx-auto flex flex-col gap-2 text-center sm:w-2/3 lg:w-1/2">
          <h1 className="text-2xl font-semibold">Get In Touch With Us</h1>
          <p className="capitalize leading-7 text-neutral-black-400">
            for more information about our product & services. please feel free
            to drop us an email. our staff always be there to help you out. do
            not hesitate!
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-20 lg:flex-row lg:items-start lg:gap-40">
          <div className="flex flex-wrap justify-between gap-10 lg:flex-col">
            <div className="flex w-64 gap-4">
              <div>
                <MapPin />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Address</h3>
                <p className="text-justify text-neutral-black-400">
                  123 Main Street
                  <br />
                  New York, NY 1001
                  <br />
                  United States
                </p>
              </div>
            </div>
            <div className="flex w-64 gap-4">
              <div>
                <Phone />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Phone</h3>
                <p className="text-justify text-neutral-black-400">
                  Mobile: +1 123 456 789
                  <br />
                  Hotline: +1 123 456 789
                </p>
              </div>
            </div>
            <div className="flex w-64 gap-4">
              <div>
                <Clock4 />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Working Time</h3>
                <p className="text-justify text-neutral-black-400">
                  Mon - Fri: 9:00 - 18:00
                  <br />
                  Sat - Sun: 9:00 - 16:00
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default page;
