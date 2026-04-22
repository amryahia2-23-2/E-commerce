import { getBlogCategories, getBlogOtherCategories } from '@/sanity/queries';
import { Title } from './Text';
import { BLOG_OTHER_CATEGORIES_QUERY_RESULT, BLOG_CATEGORIES_QUERY_RESULT } from "@/sanity.types"
import Link from 'next/link';
import Image from "next/image"
import { urlFor } from '@/sanity/lib/image';






async function BlogLeftSide({ slug }: { slug: string }) {
    const blogCategories: BLOG_CATEGORIES_QUERY_RESULT = await getBlogCategories();
    const blogs: BLOG_OTHER_CATEGORIES_QUERY_RESULT = await getBlogOtherCategories(slug, 5);



    const allCategories = blogCategories?.flatMap(
        (item) => item.blogCategories
    );
    const uniqueCategories = Array.from(
        new Map(allCategories?.map((cat) => [cat._id, cat])).values()
    );

    console.log("side cat", blogs)
    return (
        <div>
            <div className="border border-lightColor p-5 rounded-md">
                <Title className="text-base">Blog Categories</Title>
                <div className="space-y-2 mt-2">
                    {uniqueCategories.map((cat) => {
                        const count = allCategories?.filter(
                            (c) => c._id === cat._id
                        ).length;

                        return (

                            <div key={cat._id} className="text-lightColor flex items-center justify-between text-sm font-medium">
                                <p>{cat.title}</p>
                                <p className="text-darkColor font-semibold">({count})</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="border border-lightColor p-5 rounded-md mt-5">
                <Title className="text-base">Latest Blogs</Title>
                <div className="space-y-2 mt-2">
                    {blogs?.map((blog) => (
                        <div key={blog?._id} className="flex items-center justify-between">
                            <Link href={`/blog/${blog?.slug?.current}`} className="flex items-center gap-3 group">
                                {blog?.mainImage && (
                                    <Image
                                        src={urlFor(blog?.mainImage).url()}
                                        alt={"blogImage"}
                                        width={100}
                                        height={100}
                                        className="w-16 h-16 rounded-full object-cover border border-shop_dark_green/10 group-hover:border-shop_dark_green hoverEffect "
                                    />
                                )}

                                <p className="line-clamp-2 text-sm text-lightColor group-hover:text-shop_dark_green hoverEffect">
                                    {blog?.title}
                                </p>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogLeftSide
