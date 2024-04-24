import { useState } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';

const StarRating = ({ totalStars = 5,onChange }:any) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value:number) => {
    setRating(value);
    onChange(value)
  };

  return (
    <div className="flex space-x-2">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className="cursor-pointer "
            onClick={() => handleStarClick(starValue)}
          >
            {starValue <= rating ? (
              <BsStarFill className="text-yellow-500 w-5 h-5 " />
            ) : (
              <BsStar className="text-gray-400 hover:text-yellow-500 w-5 h-5" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
