import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';


function NoProductAvaliable({
    selectedTab,
    className
}: {
    selectedTab?: string;
    className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-10 min-h-80 space-y-4 bg-gray-100 w-full mt-10 text-center rounded-lg", className)}>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1 , y: 0 }}
      transition={{ duration: 0.5 }}
      >
      <h2 className='text-2xl font-bold text-gray-800'>
        No products available for ..
      </h2>
      </motion.div>
      <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className='text-gray-600'

      >
        We&apos;re sorry, but there are no product matching on {" "}.
        <span className='font-semibold text-darkColor'>{selectedTab}
        </span>{" "}
        criteria at the moment. Please check back later or explore other categories.
      </motion.p>
      <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
      className='flex items-center sapce-x-2 text-shop_dark_green'
      >
        <Loader2 className='w-5 h-5 animate-spin' />
        <span className='ml-2'>Checking for products...</span>
      </motion.div>
      <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className=' text-sm text-gray-500'
      >
        please check back later or explore other categories.
      </motion.p>

    </div>
  )
}

export default NoProductAvaliable

