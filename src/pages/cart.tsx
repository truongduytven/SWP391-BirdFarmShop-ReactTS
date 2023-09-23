import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { useCartContext } from '@/contexts/cart-provider'
import { Bird, Nest } from '@/lib/types'
import { birdFarmApi } from '@/services/bird-farm-api'
import { ChevronLeft, Trash2 } from 'lucide-react'
import Discount from '@/assets/discount.png'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
// import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Products = {
  birds: Bird[]
  nests: Nest[]
}

function Cart() {
  const { cart } = useCartContext()
  const [products, setProducts] = useState<Products>()

  useEffect(() => {
    const fetchProducts = async () => {
      const birdsData = birdFarmApi.post('/api/birds/get-by-ids', { birds: cart.birds }).then((res) => res.data.birds)
      const nestsData = birdFarmApi.post('/api/nests/get-by-ids', { nests: cart.nests }).then((res) => res.data.nests)

      const [birds, nests] = await Promise.all([birdsData, nestsData])

      setProducts({ birds, nests })
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

  // const makePayment = async () => {
  //   try {
  //     const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY)

  //     const { data: session } = await birdFarmApi.post('/api/checkout/create-checkout-session', {
  //       products: cart
  //     })

  //     const result = await stripe?.redirectToCheckout({
  //       sessionId: session.id
  //     })

  //     if (result?.error) {
  //       console.log(result.error)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const createOrder = async () => {
    const { data } = await birdFarmApi.post('/api/orders', {
      receiver: 'Trần Trương Văn',
      phone: '0933131464',
      address: 'chung cư Ricca',
      birds: products?.birds.map((bird) => bird._id),
      nests: products?.nests.map((nest) => nest._id)
    })
    console.log(data)
  }

  return (
    <main>
      <Container>
        <section className='my-7 px-5 container'>
          <div className='flex justify-center gap-2 '>
            <span className='uppercase text-2xl  '>Giỏ HÀNG </span>
            <span className='text-2xl '>{'>'}</span>
            <span className='uppercase text-2xl  text-gray-500'>Chi tiết thanh toán</span>
          </div>

          <div className='flex gap-10 mt-10 w-full'>
            <div className='flex justify-center gap-10 flex-1 '>
              <Table className=''>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'></TableHead>
                    <TableHead className='font-bold'>Sản phẩm </TableHead>
                    <TableHead className='font-bold'>Giá</TableHead>
                    <TableHead className='font-bold'>Hủy bỏ</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {new Array(3).fill(null).map((i) => (
                    <TableRow key={i}>
                      <TableCell className='font-medium'>
                        {' '}
                        <img
                          src='https://upload.wikimedia.org/wikipedia/commons/8/89/Black-naped_Oriole.jpg?fbclid=IwAR2NXjH7Wi1KWHPwvNvmESdLhjUE42zhr9Y-9KZneFisiKtkAimoH1ws8XI'
                          alt=''
                          className='h-[70px] w-[70px] object-cover rounded-lg m-auto'
                        />
                      </TableCell>
                      <TableCell>Chào mào huế mã SE170128</TableCell>
                      <TableCell>5.000.000đ</TableCell>
                      <TableCell className='text-right'>
                        {' '}
                        <Trash2 />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h1 className='text-3xl font-bold uppercase w-[500px] text-center'>Đơn hàng</h1>
              <div className='flex w-80 m-auto mt-5'>
                <span className='w-1/2 text-start font-bold text-xl'>Tạm tính</span>
                <span className='w-1/2 text-end font-bold text-xl'>2.500.000đ</span>
              </div>
              <div className='flex w-80 m-auto mt-5'>
                <span className='w-1/2 text-start font-bold text-xl'>Giảm giá</span>
                <span className='w-1/2 text-end font-bold text-xl'>50%</span>
              </div>
              <div className='w-80 border border-black mt-2 m-auto'></div>
              <div className='flex w-80 m-auto mt-5'>
                <span className='w-1/2 text-start font-bold text-xl'>Tổng</span>
                <span className='w-1/2 text-end font-bold text-xl'>12.500.000đ</span>
              </div>

              <div className='m-auto w-80 mt-5 py-3 px-5 bg-[#FFFAFA] rounded-2xl shadow-lg'>
                <div className='inline-flex gap-3 px-5 py-4 justify-start items-center bg-[#ECEB98] rounded-2xl'>
                  <img src={Discount} alt='' />
                  <span>Phiếu ưu đãi</span>
                </div>

                <div className='mt-3'>
                  <Input type='text' placeholder='nhập mã giảm giá ' className='w-full px-5 py-1 rounded-xl' />
                </div>
                <div className='mt-3'>
                  <Button className='px-7 py-2 font-bold rounded-3xl'>Áp dụng</Button>
                </div>
              </div>

              <div className='mt-4 w-80 m-auto'>
                <Button className='w-full' onClick={createOrder}>
                  Thanh Toán
                </Button>
              </div>
            </div>
          </div>

          <div className='container'>
            <Button className='mt-5'>
              <Link to='#' className='px-4 py-3 flex justify-start items-center gap-1 rounded-lg'>
                <ChevronLeft /> Tiếp tục xem sản phẩm{' '}
              </Link>
            </Button>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default Cart
