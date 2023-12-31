import Container from '@/components/ui/container'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select'
import NestCard from '@/components/nest-card'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Nest, Specie } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import Paginate from '@/components/paginate'
import { addSearchParams, cn } from '@/lib/utils'
import NestCardSkeleton from '@/components/nest-card-skeleton'
import { Button } from '@/components/ui/button'
import decreaseIcon from '@/assets/decrease.svg'
import { Calendar } from 'lucide-react'

const pageSize = 12

function NestList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const specie = searchParams.get('specie') || ''
  const sort = searchParams.get('sort') || 'createdAt_-1'
  const [nests, setNests] = useState<Nest[]>([])
  const [isLoadingNests, setIsLoadingNests] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [species, setSpecies] = useState<Specie[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await birdFarmApi.get('/api/species')

      setSpecies(data?.species || [])
    }
    fetchSpecies()
  }, [])

  useEffect(() => {
    const fetchNests = async () => {
      setIsLoadingNests(true)
      const { data } = await birdFarmApi.get(
        addSearchParams('/api/nests/pagination', { pageNumber, pageSize, searchQuery, specie, sort })
      )
      setNests(data?.nests || [])
      setTotalPages(data?.totalPages || null)
      setIsLoadingNests(false)
    }

    fetchNests()
  }, [pageNumber, searchQuery, specie, sort])

  return (
    <main>
      <Container>
        <div className='flex items-center justify-between mt-10 mb-6'>
          <h1 className='text-3xl font-bold'>Tổ chim đang bán tại cửa hàng</h1>
        </div>

        <div className='text-2xl font-medium'>Lọc theo tiêu chí</div>

        <div className='flex items-center gap-2 bg-accent p-2 rounded-md border w-fit mt-3 mb-6'>
          <p className='font-medium text-sm shrink-0'>Loài chim:</p>
          <Select
            value={specie}
            onValueChange={(value) => {
              navigate(addSearchParams('/nests', { searchQuery, specie: value, sort }))
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue className='font-semibold' placeholder='Lọc loài chim' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='h-96'>
                <SelectLabel>Loài chim</SelectLabel>
                <SelectItem value=''>Tất cả</SelectItem>
                {species.map((specie) => {
                  return <SelectItem value={specie._id}>{specie.name}</SelectItem>
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='text-2xl font-medium mt-3'>Sắp xếp theo</div>

        <div className='mb-12 flex items-center mt-2 gap-3'>
          <Button
            onClick={() => {
              navigate(addSearchParams('/nests', { sort: 'createdAt_-1', searchQuery, specie }))
            }}
            variant={sort === 'createdAt_-1' ? 'default' : 'outline'}
            className='flex items-center gap-1'
          >
            <Calendar className='w-5 h-5 mr-1' />
            Mới nhất
          </Button>
          <Button
            onClick={() => {
              navigate(addSearchParams('/nests', { sort: 'price_1', searchQuery, specie }))
            }}
            variant={sort === 'price_1' ? 'default' : 'outline'}
            className='flex items-center gap-1'
          >
            <img
              src={decreaseIcon}
              className={cn('w-5 h-5 mr-1 dark:filter dark:invert scale-y-[-1]', sort === 'price_1' && 'filter invert')}
            />
            Giá tăng dần
          </Button>
          <Button
            onClick={() => {
              navigate(addSearchParams('/nests', { sort: 'price_-1', searchQuery, specie }))
            }}
            variant={sort === 'price_-1' ? 'default' : 'outline'}
            className='flex items-center gap-1'
          >
            <img
              src={decreaseIcon}
              className={cn('w-5 h-5 mr-1 dark:filter dark:invert', sort === 'price_-1' && 'filter invert')}
            />
            Giá giảm dần
          </Button>
        </div>

        {isLoadingNests ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {Array(...new Array(12)).map((_, i) => {
              return <NestCardSkeleton key={i} />
            })}
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {nests.map((nest) => {
              return <NestCard key={nest._id} nest={nest} />
            })}
          </div>
        )}

        {!!totalPages && (
          <Paginate
            className='mt-8'
            path={addSearchParams('/nests', { searchQuery, specie, sort })}
            pageSize={pageSize}
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        )}
      </Container>
    </main>
  )
}

export default NestList
