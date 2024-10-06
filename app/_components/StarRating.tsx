"use client";
import StarIcon from "@/public/assets/Star.svg";
import EmptyStar from "@/public/assets/Empty Star.svg";
import { useState } from "react";

interface Props {
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

function StarRating({ onRatingChange, disabled }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onMouseEnter={() => !disabled && setHover(starValue)}
            onMouseLeave={() => !disabled && setHover(0)}
            onClick={() => {
              if (!disabled) {
                setRating(starValue);
                onRatingChange(starValue);
              }
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
