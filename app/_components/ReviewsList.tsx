"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { timeFromNow } from "@/lib/utils";
import EmptyStar from "@/public/assets/Empty Star.svg";
import StarIcon from "@/public/assets/Star.svg";
import { Comment } from "@prisma/client";
import { useState } from "react";
import useUrlQuery from "../_hooks/useUrlQuery";

function getInitials(name: string) {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join(" ");
}

interface Props {
  reviews: Comment[];
}

function ReviewsList({ reviews }: Props) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const [query] = useUrlQuery();

  let sortedReviews = [...reviews];

  const sortBy = query.sortBy || "newest";

  if (sortBy === "newest")
    sortedReviews = sortedReviews.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1,
    );

  if (sortBy === "oldest")
    sortedReviews = sortedReviews.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
    );

  if (sortBy === "highest-rating")
    sortedReviews = sortedReviews.sort((a, b) => b.rating - a.rating);

  if (sortBy === "lowest-rating")
    sortedReviews = sortedReviews.sort((a, b) => a.rating - b.rating);

  const visibleSortedReviews = sortedReviews.slice(0, visibleReviews);

  function handleShowMoreReviews() {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
  }

  return (
    <ul className="flex flex-col gap-2 py-6">
      {visibleSortedReviews.map((review, index) => (
        <li
          key={index}
          className="grid max-w-[700px] grid-cols-1 gap-3 px-2 py-6 lg:grid-cols-[1fr_6fr_2fr]"
        >
          <Avatar className="size-12 rounded-full border">
            <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <p className="text-body font-medium capitalize">{review.name}</p>

            <time
              dateTime={review.createdAt.toISOString()}
              className="text-xs font-medium uppercase text-muted-foreground"
            >
              {timeFromNow(new Date(review.createdAt))}
            </time>

            <p className="mt-1 text-body text-muted-foreground">
              {review.review}
            </p>
          </div>

          <div className="flex items-center self-start">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="size-5">
                {index < review.rating ? (
                  <StarIcon className="size-full [&_*]:fill-neutral-black-400" />
                ) : (
                  <EmptyStar className="size-full [&_*]:stroke-neutral-black-400" />
                )}
              </span>
            ))}
          </div>
        </li>
      ))}

      {visibleReviews < reviews.length && (
        <Button
          variant="outline"
          onClick={handleShowMoreReviews}
          className="mx-auto w-fit"
        >
          Load more reviews
        </Button>
      )}
    </ul>
  );
}

export default ReviewsList;
