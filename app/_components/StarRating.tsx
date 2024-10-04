"use client";
import StarIcon from "@/public/assets/Star.svg";
import EmptyStar from "@/public/assets/Empty Star.svg";
import { useState } from "react";

interface Props {
  onRatingChange: (rating: number) => void;
}

function StarRating({ onRatingChange }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              setRating(starValue);
              onRatingChange(starValue);
            }}
          >
            {starValue <= (hover || rating) ? (
              <StarIcon className="size-7 cursor-pointer" />
            ) : (
              <EmptyStar className="size-7 cursor-pointer" />
            )}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
