import CategoryProduct from '@/components/CategoryProduct'
import Container from '@/components/Container'
import { Title } from '@/components/Text'
import { getCategories } from '@/sanity/queries'


async function CategoryPage({params}:{params:Promise<{slug:string}>}) {
  const categories = await getCategories() 
  const { slug } = await params
  return (
    <div className='mt-10'>
      <Container>
        <Title className='text-sope_darkColor tracking-tight text-sm md:text-medium'>Products by category:{" "}
        <span className='font-bold text-green-600 capitalize tracking-wide'>
          {slug && slug}
        </span>
        </Title>
        <CategoryProduct categories={categories} slug={slug}/>
      </Container>
    </div>
  )
}

export default CategoryPage
