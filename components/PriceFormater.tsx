
import { twMerge } from 'tailwind-merge';

interface PriceFormaterProps {
  amount?: number;
  className?: string;
}
function PriceFormater({
  amount,
  className
}: PriceFormaterProps) {
  const formattedPrice = Number(amount || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  return (
    <div>
      <span className={twMerge("text-sm font-semibold text-darkColor", className)}>{formattedPrice}</span>
    </div>
  )
}

export default PriceFormater
