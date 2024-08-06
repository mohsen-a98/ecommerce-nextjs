import DeliveryIcon from "@/public/assets/Delivery.svg";
import ShieldCheckIcon from "@/public/assets/Shield Check.svg";
import StarBadgeIcon from "@/public/assets/Star Badge.svg";
import FeatureItem from "./FeatureItem";

function Features() {
  return (
    <section className="container grid grid-cols-1 gap-12 py-14 md:grid-cols-2 md:py-[88px] lg:grid-cols-3">
      <FeatureItem
        icon={<DeliveryIcon />}
        title="Free Shipping"
        description="Upgrade your style today and get FREE shipping on all orders! Don't miss out."
      />
      <FeatureItem
        icon={<StarBadgeIcon />}
        title="Satisfaction Guarantee"
        description="Shop confidently with our Satisfaction Guarantee: Love it or get a refund."
      />
      <FeatureItem
        icon={<ShieldCheckIcon />}
        title="Secure Payment"
        description="Your security is our priority. Your payments are secure with us."
      />
    </section>
  );
}

export default Features;
