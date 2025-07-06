import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
export default function StartRating({  rating, size = 14 }) {

    const parsedRating = parseFloat(rating);
    const fullStars = Math.floor(parsedRating);
    const hasHalfStar = parsedRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="inline-flex text-yellow-500 items-center">
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} size={size} />
            ))}
            {hasHalfStar && <FaStarHalfAlt size={size} />}
            {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={`empty-${i}`} size={size} />
            ))}
        </div>
    );
}