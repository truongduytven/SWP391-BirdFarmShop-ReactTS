import Container from '@/components/ui/container'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '@/constants/shopRoutes'
import { Button } from '@/components/ui/button'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import ProfileButton from '../profile-button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import logoBlack from '@/assets/logo-black.png'
import logoWhite from '@/assets/logo-white.png'
import { useTheme } from '../theme-provider'
import { useCartContext } from '@/contexts/cart-provider'
// import { useAuthContext } from '@/contexts/auth-provider'
import nestEmpty from '@/assets/nest-empty.svg'
import { ModeToggle } from '../mode-toggle'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import breedIcon from '@/assets/breed.svg'
import birdIcon from '@/assets/bird-color.svg'
import starFillIcon from '@/assets/star-fill.svg'
import nestIcon from '@/assets/nest-color.svg'
import { useState } from 'react'
import { useBreedStore } from '@/store/use-breed'

type TTypeSearch = 'sell' | 'breed' | 'nest'

function Header() {
  const { theme } = useTheme()
  // const { user } = useAuthContext()
  const { quantityInCart } = useCartContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [typeSearch, setTypeSearch] = useState<TTypeSearch>('sell')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery === '') return

    window.scrollTo(0, 0)
    if (typeSearch === 'sell') {
      navigate(`/birds?type=sell&searchQuery=${searchQuery}`)
      return
    }

    if (typeSearch === 'breed') {
      navigate(`/birds?type=breed&searchQuery=${searchQuery}`)
      return
    }

    if (typeSearch === 'nest') {
      navigate(`/nests?searchQuery=${searchQuery}`)
      return
    }
  }

  return (
    <header className='fixed top-0 z-50 w-full px-4 border-b sm:flex sm:justify-between sm:items-center bg-card'>
      <Container>
        <div className='flex gap-8 pt-6'>
          <Link to='/' className='shrink-0'>
            <img className='h-14' src={theme === 'light' ? logoBlack : logoWhite} />
          </Link>

          <div className='flex flex-col flex-1'>
            <div className='relative flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <Sheet>
                  <SheetTrigger>
                    <Menu className='h-6 md:hidden' />
                  </SheetTrigger>
                  <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
                    <nav className='flex flex-col gap-4'>
                      {routes.map((route) => {
                        return (
                          <Link key={route.label} to={route.href} className='px-2 py-1 text-lg'>
                            {route.label}
                          </Link>
                        )
                      })}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>

              <form onSubmit={handleSearch} className='flex items-center flex-1 gap-4 mr-8'>
                <div className='flex items-center w-full px-3 overflow-hidden border rounded-md'>
                  <Search className='w-4 h-4 mr-2 opacity-50 shrink-0' />
                  <input
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                    }}
                    placeholder='Tìm kiếm...'
                    className='flex w-full h-10 py-3 text-sm bg-transparent rounded-md outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400'
                  />
                </div>

                <Select
                  value={typeSearch}
                  onValueChange={(val) => {
                    setTypeSearch(val as TTypeSearch)
                  }}
                >
                  <SelectTrigger className='w-[160px]'>
                    <SelectValue placeholder='Bộ lọc...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='sell'>
                      <div className='flex items-center gap-1'>
                        <img src={birdIcon} className='block w-4 h-4' />
                        <p>Chim kiểng</p>
                      </div>
                    </SelectItem>
                    <SelectItem value='breed'>
                      <div className='flex items-center gap-1'>
                        <img src={breedIcon} className='block w-4 h-4' />
                        <p>Chim phối giống</p>
                      </div>
                    </SelectItem>
                    <SelectItem value='nest'>
                      <div className='flex items-center gap-1'>
                        <img src={nestIcon} className='block w-4 h-4' />
                        <p>Tổ chim non</p>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </form>

              <div className='flex items-center justify-end'>
                <ModeToggle className='shrink-0' />

                <Button
                  onClick={() => {
                    window.scrollTo(0, 0)
                  }}
                  asChild
                  variant='ghost'
                  size='icon'
                  className='relative shrink-0'
                  aria-label='Shopping Cart'
                >
                  <Link to='/cart'>
                    <ShoppingCart className='w-6 h-6' />
                    {!!quantityInCart && (
                      <div className='bg-red-500 text-slate-50 absolute rounded-full w-5 h-5 text-sm flex justify-center items-center -top-[2px] -right-[2px]'>
                        {quantityInCart}
                      </div>
                    )}
                  </Link>
                </Button>

                {/* {user && (
                  <Button variant='ghost' size='icon' className='shrink-0' aria-label='Shopping Cart'>
                    <Bell className='w-6 h-6' />
                  </Button>
                )} */}

                <ProfileButton className='shrink-0' />
              </div>
            </div>

            <nav className='flex items-center justify-between pb-1 mt-2'>
              {routes.map((route) => {
                return (
                  <Button
                    key={route.label}
                    onClick={() => {
                      window.scrollTo(0, 0)
                      navigate(route.href)
                    }}
                    variant='ghost'
                    className='flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary'
                  >
                    <img src={route.icon} className='w-6 h-6' />
                    {route.label}
                  </Button>
                )
              })}
              <Button
                onClick={() => {
                  useBreedStore.setState({ activeBreed: true })
                }}
                variant='ghost'
                className='flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary'
              >
                <img src={nestEmpty} className='w-6 h-6' />
                Đặt tổ chim non
              </Button>
              <Button
                onClick={() => {
                  window.scrollTo(0, 0)
                  navigate('/ratings')
                }}
                variant='ghost'
                className='flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary'
              >
                <img src={starFillIcon} className='w-6 h-6' />
                Đánh giá của shop
              </Button>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
