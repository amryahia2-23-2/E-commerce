
import Container from '@/components/Container'
import { getSingleBlog } from "@/sanity/queries"
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Calendar, ChevronLeftIcon, Pencil } from 'lucide-react';
import dayjs from 'dayjs';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import BlogLeftSide from '@/components/BlogLeftSide';
import { SINGLE_BLOG_QUERY_RESULT } from '@/sanity.types';


async function SingleBlogPage({params} : {params : Promise<{slug: string}>}) {
  

  const { slug } = await params;
  const singleBlog: SINGLE_BLOG_QUERY_RESULT | null= await getSingleBlog(slug);
  console.log(singleBlog);
  if(!singleBlog) return notFound();

  
  return (
    <div className='py-10'>
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <div className="md:col-span-3">
        {singleBlog?.mainImage &&(
          <Image 
          src={urlFor(singleBlog?.mainImage).url()}
          alt="BlogImage"
          width={800}
          height={800}
          className='w-full max-h-[550px] object-cover rounded-lg'
          />
        )}
        <div>
          <div className="text-xs flex items-center gap-5 my-7">
            <div className="flex items-center relative group cursor-pointer">
              {singleBlog?.blogCategories?.map((item, index) => (
                <p key={index}
                className="font-semibold text-shop_dark_green tracking-wide"
                >
                  {item.title};
                </p>
                
              ))}
              <span className="absolute w-full h-0.5 left-0 -bottom-1.5 bg-lightColor/30 group-hover:bg-shop_dark_green hoverEffect"></span>
            </div>
            <p className="relative group cursor-pointer font-semibold flex items-center gap-1 text-gray-500 tracking-wide hover:text-shop_dark_green hoverEffec">
                  <Pencil size={12} />  {singleBlog?.author?.name}
              <span className="absolute w-full h-0.5 left-0 -bottom-1.5 bg-lightColor/30 group-hover:bg-shop_dark_green hoverEffect"></span>
              </p>
            <p className="relative group cursor-pointer font-semibold flex items-center gap-1 text-gray-500 tracking-wide hover:text-shop_dark_green hoverEffect">
                  <Calendar size={12} />  {dayjs(singleBlog?.publishedAt).format('DD MMM YYYY')};
              <span className="absolute w-full h-0.5 left-0 -bottom-1.5 bg-lightColor/30 group-hover:bg-shop_dark_green hoverEffect"></span>
              </p>
          </div>
          <h2 className="text-2xl font-semibold my-5">
            {singleBlog?.title}
          </h2>
          <div>
            {singleBlog?.body && (
              <PortableText
                value={singleBlog.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="my-5 text-base leading-8 first:mt-0 last:mb-0 text-gray-600">
                        {children}
                      </p>
                    ),

                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold my-6 tracking-tight">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold my-5 tracking-tight">
                        {children}
                      </h3>
                    ),

                    blockquote: ({ children }) => (
                      <blockquote className="my-6 italic border-l-4 border-gray-300 pl-4 text-gray-600">
                        {children}
                      </blockquote>
                    ),
                  },
                  types: {
                    image: ({ value }) => (
                      <Image
                        src={urlFor(value).width(1600).url()}
                        alt={value.alt || "Blog Image"}
                        width={1400}
                        height={800}
                        className="w-full rounded-xl my-6"
                      />
                    ),

                    separator: ({ value }) => {
                      switch (value.style) {
                        case "line":
                          return (
                            <div className="my-8 border-b border-gray-300 w-1/2 mx-auto" />
                          )

                        case "dotted":
                          return (
                            <div className="my-8 border-b border-dotted border-gray-300 w-1/2 mx-auto" />
                          )

                        case "dashed":
                          return (
                            <div className="my-8 border-b border-dashed border-gray-300 w-1/2 mx-auto" />
                          )

                        default:
                          return null
                      }
                    },
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc ml-6 my-5 space-y-2 text-gray-600">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal ml-6 my-5 space-y-2 text-gray-600">
                        {children}
                      </ol>
                    ),
                  },

                  listItem: {
                    bullet: ({ children }) => <li>{children}</li>,
                    number: ({ children }) => <li>{children}</li>,
                  },
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            )}
          </div>
        </div>
        <div className="w-fit">
          <Link href="/blog" className="flex items-center gap-2 mt-6 text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon size={23} />
            <span>
              Back to Blog
            </span>
          </Link>
        </div>
      </div>
      <BlogLeftSide slug={slug}/>
    </Container>
    </div>
  )
}

export default SingleBlogPage;
