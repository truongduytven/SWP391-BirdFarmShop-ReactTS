import { CreditCard, LogIn, LogOut, Settings, User as UserIcon } from 'lucide-react'
import registerIcon from '@/assets/register.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'
import { User } from '@/lib/types'

type Props = {
  className?: string
  user: User | null
}

function ProfileButton({ className, user }: Props) {
  const { theme } = useTheme()

  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className={cn('mr-2', className)} aria-label='Shopping Cart'>
            <UserIcon className='h-6 w-6' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link to='/auth/sign-in'>
                <LogIn className='mr-2 h-4 w-4' />
                <span>Đăng nhập</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link to='/auth/sign-up'>
                <img
                  alt='đăng ký'
                  src={registerIcon}
                  className={cn('mr-2 h-4 w-4', theme === 'dark' && 'filter invert')}
                />
                <span>Đăng ký</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer ml-3'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none line-clamp-1'>Trần Trương Văn</p>
            <p className='text-xs leading-none text-muted-foreground line-clamp-1'>kingchenobama711@gmail.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            <UserIcon className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
