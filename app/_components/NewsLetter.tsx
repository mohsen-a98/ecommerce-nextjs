import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function NewsLetter() {
  return (
    <div className="mt-28 bg-muted py-16">
      <div className="container text-center lg:text-left">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="space-y-2">
            <h3>Join Our Newsletter</h3>
            <p className="text-body">
              We love to surprise our subscribers with occasional gifts.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Your email address"
              className="text-body font-medium lg:w-80"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
