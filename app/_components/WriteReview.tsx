"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CloseIcon from "@/public/assets/X.svg";
import WriteReviewForm from "./WriteReviewForm";

function WriteReview() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="max-w-96 sm:max-w-[425px] [&_[id=close]]:hidden">
        <DialogHeader className="flex-row items-center justify-between border-b pb-5">
          <DialogTitle>Write Review</DialogTitle>
          <DialogClose className="!mt-0">
            <CloseIcon />
          </DialogClose>
        </DialogHeader>
        <WriteReviewForm />
      </DialogContent>
    </Dialog>
  );
}

export default WriteReview;
