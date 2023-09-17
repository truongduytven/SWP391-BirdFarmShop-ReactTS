import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { cn, formatPrice } from '@/lib/utils'
import { Button } from './ui/button'
import { Bird } from '@/lib/types'
import noImage from '@/assets/no-image.avif'
import redHeart from '@/assets/red-heart.svg'
import blackHeart from '@/assets/black-heart.svg'
import { useState } from 'react'
import { useToast } from './ui/use-toast'

type Props = {
  className?: string
  bird: Bird
}

function BirdCard({ className, bird }: Props) {
  const wishList: Record<string, boolean> = JSON.parse(localStorage.getItem('wishList') || '{}')
  const cart: Record<string, number> = JSON.parse(localStorage.getItem('cart') || '{}')
  const [isInWishList, setIsInWishList] = useState(wishList[bird._id])
  const { toast } = useToast()

  const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    cart[bird._id] = cart[bird._id] ? cart[bird._id] + 1 : 1
    localStorage.setItem('cart', JSON.stringify(cart))
    toast({
      variant: 'success',
      title: 'Đã thêm chim vào giỏ hàng!',
      duration: 1500
    })
  }

  const addToWishList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    wishList[bird._id] = true
    localStorage.setItem('wishList', JSON.stringify(wishList))
    setIsInWishList(!isInWishList)
    toast({
      variant: 'success',
      title: 'Đã thêm chim vào danh sách mong ước!',
      duration: 1500
    })
  }

  const removeFromWishList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    delete wishList[bird._id]
    localStorage.setItem('wishList', JSON.stringify(wishList))
    setIsInWishList(!isInWishList)
    toast({
      variant: 'destructive',
      title: 'Đã bỏ chim khỏi danh sách mong ước!',
      duration: 1500
    })
  }

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  }

  return (
    <Link
      to={`/birds/${bird?._id}`}
      className={cn('focus:ring-2 rounded-lg hover:ring-2 ring-primary transition duration-300', className)}
    >
      <Card className='border-2 overflow-hidden'>
        <CardHeader className='p-0 mb-4'>
          <div className='aspect-square overflow-hidden'>
            <img
              src={bird?.imageUrls?.[0] || noImage}
              alt=''
              className='object-cover w-full h-full transition-all duration-300 hover:scale-105'
            />
          </div>
        </CardHeader>
        <CardContent className='flex-col items-start'>
          <div>
            <p className='font-semibold text-lg lg:text-xl'>
              {bird?.specie?.name} mã {bird?.name}
            </p>
          </div>
          <div className='flex items-center justify-between lg:text-lg'>{formatPrice(bird?.price || 0)}</div>
        </CardContent>
        <CardFooter className='flex gap-2 flex-col'>
          <div className='flex w-full gap-2'>
            <Button onClick={addToCart} variant='outline' className='w-full'>
              Thêm vào giỏ
            </Button>
            {isInWishList ? (
              <Button onClick={removeFromWishList} className='p-1' variant='outline' size='icon'>
                <img src={redHeart} alt='heart' />
              </Button>
            ) : (
              <Button onClick={addToWishList} className='p-1' variant='outline' size='icon'>
                <img src={blackHeart} alt='heart' />
              </Button>
            )}
          </div>
          <Button onClick={handleBuyNow} className='w-full'>
            Mua ngay
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BirdCard
