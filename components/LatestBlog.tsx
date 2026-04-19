import React from 'react'
import { Title } from './Text'
import { getLatestBlogs } from '../sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Calendar } from 'lucide-react'
import type { LATEST_BLOG_QUERY_RESULT } from "@/sanity.types"
import dayjs from 'dayjs'





async function LatestBlog() {
  const blogs: LATEST_BLOG_QUERY_RESULT = await getLatestBlogs()
  
  
  return (
    <div className='mb-10'>
      <Title className='mb-16'>Latest Blog</Title>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
        {blogs.map((blog , index) => (
          <div key={blog?._id || index} className='mb-5 rounded-md shadow-md overflow-hidden bg-shop_light_bg border hover:border-shop_light_green/90 hoverEffect'>
            {blog?.mainImage && (
            <Link href={`/blog/${blog?.slug?.current}`}>
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt='blogImage'
                  width={500}
                  height={500}
                  className='w-full h-60 object-cover'
                />
                </Link>
              )}
            <div className='bg-shop_light_bg p-5'>
              <div className='text-xs flex items-center gap-5'>
                <div className='relative group cursor-pointer overflow-visible'>
                  {blog?.blogCategories?.map((item , index) => (
                    <p key={index} className='text-sm font-semibold text-shop_dark_green tracking-wider'>{item?.title}</p>
                  ))}
                  <span className='absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-0.5 group-hover:bg-shop_dark_green hoverEffect'/>
                </div>
                  <p className='flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect'>
                  <Calendar size={15}/>
                    {dayjs(blog?.publishedAt).format('DD MMMM YYYY')}
                    <span className='absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-0.5 group-hover:bg-shop_dark_green hoverEffect'/>
                  </p>
              </div>
                <Link href={`/blog/${blog?.slug?.current}`} className='text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect'>{blog?.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestBlog
