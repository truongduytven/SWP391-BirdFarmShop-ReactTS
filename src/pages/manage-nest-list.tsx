import Paginate from '@/components/paginate'
import { Nest, getSpecie } from '@/lib/types'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import { MoreHorizontal, Plus } from 'lucide-react'
import { addSearchParams, cn, formatPrice } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Spinner from '@/components/ui/spinner'
import { birdFarmApi } from '@/services/bird-farm-api'
import noImage from '@/assets/no-image.webp'

const pageSize = 12

function ManageNestList() {
  const [searchParams] = useSearchParams()
  const pageNumber = Number(searchParams.get('pageNumber') || 1)
  const searchQuery = searchParams.get('searchQuery') || ''
  const [nests, setNests] = useState<Nest[]>([])
  const [isLoadingNests, setIsLoadingNests] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  useEffect(() => {
    const fetchNests = async () => {
      setIsLoadingNests(true)
      try {
        const { data } = await birdFarmApi.get(
          addSearchParams('/api/nests/pagination', { searchQuery, pageNumber, pageSize })
        )
        setNests(data?.nests || null)
        setIsLoadingNests(false)
        setTotalPages(data?.totalPages || null)
      } catch (error) {
        console.log(error)
      }
    }

    fetchNests()
  }, [pageNumber, searchQuery])

  if (!nests) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-3xl font-bold'>Danh sách tổ chim</div>
        <Link className={cn(buttonVariants(), 'mb-6 flex items-center gap-1 my-auto')} to='/manager/nests/new'>
          <span>Tạo Tổ Chim</span>
          <Plus className='w-5 h-5' />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loài</TableHead>
            <TableHead className='text-center'>Ảnh</TableHead>
            <TableHead>Tổ chim</TableHead>
            <TableHead>Chim bố</TableHead>
            <TableHead>Chim mẹ</TableHead>
            <TableHead className='text-center'>Giá</TableHead>
            {/* <TableHead className='text-center'>Đã Bán</TableHead> */}
            <TableHead className='text-end'></TableHead>
          </TableRow>
        </TableHeader>

        {!isLoadingNests && (
          <TableBody>
            {nests.map((nest) => {
              return (
                <TableRow key={nest._id}>
                  <TableCell>{getSpecie(nest).name}</TableCell>
                  <TableCell className='text-center'>
                    <img
                      className='block object-cover w-16 mx-auto border rounded-md aspect-square'
                      src={nest.imageUrls?.[0] || noImage}
                      alt=''
                    />
                  </TableCell>
                  <TableCell>{nest.name}</TableCell>
                  <TableCell>
                    {nest.dad ? (
                      <Link className='hover:underline hover:text-primary' to={`/manager/birds/${nest.dad._id}`}>
                        {nest.dad.name}
                      </Link>
                    ) : (
                      'Không có thông tin'
                    )}
                  </TableCell>
                  <TableCell>
                    {nest.mom ? (
                      <Link className='hover:underline hover:text-primary' to={`/manager/birds/${nest.mom._id}`}>
                        {nest.mom.name}
                      </Link>
                    ) : (
                      'Không có thông tin'
                    )}
                  </TableCell>
                  <TableCell className='font-medium text-center text-primary'>{formatPrice(nest.price)}</TableCell>
                  {/* <TableCell className='text-center'>Đã Bán</TableCell> */}
                  <TableCell className='text-center'>
                    <Button size='icon' asChild variant='ghost'>
                      <Link to={`/manager/nests/${nest._id}`}>
                        <MoreHorizontal className='cursor-pointer' />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        )}
      </Table>
      {isLoadingNests && <Spinner className='mt-5' />}
      {!!totalPages && (
        <Paginate
          className='mt-8'
          path={`/manager/nests?searchQuery=${searchQuery}`}
          pageSize={pageSize}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default ManageNestList
