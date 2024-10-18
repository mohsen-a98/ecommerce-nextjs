import Link from "next/link";
import Logo from "./Logo";
import GithubIcon from "@/public/assets/Social Icons/Github.svg";
import InstagramIcon from "@/public/assets/Social Icons/Instagram.svg";
import YoutubeIcon from "@/public/assets/Social Icons/Youtube.svg";
import MasterCardIcon from "@/public/assets/Colored Icons/Mastercard.svg";
import AmexIcon from "@/public/assets/Colored Icons/Amex.svg";
import VisaIcon from "@/public/assets/Colored Icons/Visa.svg";

function Footer() {
  return (
    <footer className="container flex flex-col gap-24 pt-16">
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-3 lg:grid-cols-12">
        <div className="col-span-2 flex flex-col gap-4 sm:col-span-1 lg:col-span-3 xl:col-span-2">
          <Logo className="h-11 w-[168px]" />
          <p className="text-body">
            DevCut is a YouTube channel for practical project-based learning.
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href={""}>
                <GithubIcon />
              </Link>
            </li>
            <li>
              <Link href={""}>
                <InstagramIcon />
              </Link>
            </li>
            <li>
              <Link href={""}>
                <YoutubeIcon />
              </Link>
            </li>
          </ul>
        </div>
        <FooterLink
          heading="support"
          links={[
            { name: "Faq", href: "#" },
            { name: "Terms of use", href: "#" },
            { name: "Privacy Policy", href: "#" },
          ]}
          className="lg:col-span-2 xl:col-start-4"
        />
        <FooterLink
          heading="COMPANY"
          links={[
            { name: "About us", href: "#" },
            { name: "Contact", href: "#" },
            { name: "Careers", href: "#" },
          ]}
          className="lg:col-span-2"
        />
        <FooterLink
          heading="SHOP"
          links={[
            { name: "My Account", href: "/dashboard" },
            { name: "Checkout", href: "/checkout" },
            { name: "Cart", href: "/cart" },
          ]}
          className="lg:col-span-2"
        />
        <FooterLink
          heading="ACCEPTED PAYMENTS"
          links={[
            { icon: <MasterCardIcon />, href: "#" },
            { icon: <AmexIcon />, href: "#" },
            { icon: <VisaIcon />, href: "#" },
          ]}
          className="lg:col-span-3 xl:col-span-2 xl:col-start-11 [&>ul]:flex-row [&>ul]:items-center [&>ul]:gap-2 [&>ul]:lg:gap-4"
        />
      </div>
      <div className="border-t border-t-muted py-6 text-center">
        &copy; {new Date().getFullYear()} DevCut. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

function FooterLink({
  heading,
  links,
  className,
}: {
  heading: string;
  className?: string;
  links: {
    name?: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}) {
  return (
    <div className={className}>
      <h4 className="text-body uppercase text-muted-foreground">{heading}</h4>
      <ul className="mt-8 flex flex-col gap-4 lg:mt-10">
        {links.map((link, index) => (
          <li key={link.name ? link.name : index}>
            <Link
              href={link.href}
              className={`${link.icon && "[&_svg]:grayscale"}`}
            >
              {link.name || link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
