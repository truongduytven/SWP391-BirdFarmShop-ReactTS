import { useState, useRef } from 'react'
import Container from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import userIcon from '@/assets/user.png'
import voucherIcon from '@/assets/voucher.svg'
import { Input } from '@/components/ui/input'
import { Bell } from 'lucide-react'

function Profile() {
  const [activeTab, setActiveTab] = useState('account-general')
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const fileInputRef = useRef(null)
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  const handleShowPasswordFields = () => {
    setShowPasswordFields(true)
  }

  const handleSavePassword = () => {
    // Add your code to handle saving the new password here
    if (newPassword === confirmPassword) {
      // Save the new password (replace with your logic)
      alert('Password saved successfully!')
      // You can add further logic to actually save the password to your backend.
      setShowPasswordFields(false)
    } else {
      alert('Passwords do not match. Please try again.')
    }
  }

  const handleCancelPasswordChange = () => {
    setShowPasswordFields(false)
  }

  const handleUploadButtonClick = () => {
    // Trigger the file Input click event
    if (fileInputRef.current) {
      ;(fileInputRef.current as HTMLInputElement).click()
    }
  }
  return (
    <main>
      <Container className='p-10'>
        <div className='rounded-lg shadow-md '>
          <div className='flex'>
            <div className='w-1/4 p-4'>
              <div className='flex flex-col'>
                <div className='flex items-center justify-center mb-6'>
                  <img
                    className='w-16 border-2 rounded-full border-primary'
                    src='https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-50-hinh-anh-avatar-hai-huoc-cute-va-dang-yeu-nhat_1.jpg'
                    alt='Profile Avatar'
                  />
                  <div className='ml-4'>
                    <p className='text-xl font-semibold'>thuongminhlsr</p>
                    <p className='text-sm'>Khách hàng</p>
                  </div>
                </div>
                <div className='flex items-center mb-6 ml-10'>
                  <img src={userIcon} className='w-10 h-10 mr-1' />
                  <a
                    className={` hover:text-primary rounded-md ${
                      activeTab === 'account-general' ? 'text-primary' : ''
                    }`}
                    href='#'
                    onClick={() => handleTabClick('account-general')}
                  >
                    Tài khoản của tôi
                  </a>
                </div>
                <div className='flex items-center mb-6 ml-10'>
                  <img src={voucherIcon} className='w-10 h-10 mr-1' />
                  <a
                    className={`hover:text-primary rounded-md ${
                      activeTab === 'account-vouchers' ? 'text-primary' : ''
                    }`}
                    href='#'
                    onClick={() => handleTabClick('account-vouchers')}
                  >
                    Kho Voucher
                  </a>
                </div>
                <div className='flex items-center mb-6 ml-10'>
                  <Bell className='w-10 h-10 mr-1' />
                  <a
                    className={` hover:text-primary rounded-md ${
                      activeTab === 'account-notifications' ? 'text-primary' : ''
                    }`}
                    href='#'
                    onClick={() => handleTabClick('account-notifications')}
                  >
                    Thông báo
                  </a>
                </div>
              </div>
            </div>

            <div className='w-3/4 p-4 bg-card'>
              <div>
                <div className={`${activeTab === 'account-general' ? 'block' : 'hidden'}`}>
                  <h1 className='mb-4 text-2xl font-semibold'>Hồ sơ của tôi</h1>

                  <div className='flex items-center mb-4'>
                    <img
                      className='w-32 h-32 mr-4'
                      src='https://nhadepso.com/wp-content/uploads/2023/03/tron-bo-50-hinh-anh-avatar-hai-huoc-cute-va-dang-yeu-nhat_1.jpg'
                    />
                    <div className='flex flex-col'>
                      <Button className='' onClick={handleUploadButtonClick}>
                        Upload new photo
                      </Button>
                      <Input
                        type='file'
                        className='hidden'
                        ref={fileInputRef}
                        accept='image/jpeg, image/png, image/gif'
                      />
                      <div className='mt-2 text-sm text-card-foreground'>Allowed JPG, GIF or PNG. Max size of 800K</div>
                    </div>
                  </div>
                  <hr />
                  <div className=''>
                    <div className=''>
                      <label>Tên người dùng</label>
                      <Input type='text' className='w-full p-2 mb-2 border rounded-md border-muted-foreground' />
                    </div>

                    <div className=''>
                      <label className=''>E-mail</label>
                      <Input type='text' className='w-full p-2 mb-2 border rounded-md border-muted-foreground' />
                      <div className='flex flex-col justify-center w-4/5 h-16 p-4 bg-yellow-300 rounded-md '>
                        Your email is not confirmed. Please check your inbox.
                        <br />
                        <a className='text-blue-500 underline hover:' href='#'>
                          Resend confirmation
                        </a>
                      </div>
                    </div>
                    <div className=''>
                      <label className=''>Điện thoại</label>
                      <Input type='number' className='w-full p-2 mb-2 border rounded-md border-muted-foreground' />
                    </div>
                    <div className=''>
                      <label className=''>Địa chỉ</label>
                      <Input type='text' className='w-full p-2 mb-2 border rounded-md border-muted-foreground' />
                    </div>
                    <div className=''>
                      <label className=''>Password</label>
                      <Input
                        type='password'
                        className='w-full p-2 mb-2 border rounded-md border-muted-foreground'
                        id='currentPassword'
                      />
                      <Button onClick={handleShowPasswordFields}>Change Password</Button>
                    </div>
                    {showPasswordFields && (
                      <div id='passwordFields'>
                        <div className=''>
                          <label className=''>New Password</label>
                          <Input
                            type='password'
                            className='w-full p-2 mb-2 border rounded-md border-muted-foreground'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className=''>
                          <label className=''>Confirm Password</label>
                          <Input
                            type='password'
                            className='w-full p-2 mb-2 border rounded-md border-muted-foreground'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <Button className='mr-5' onClick={handleSavePassword}>
                          Save
                        </Button>
                        <Button variant={'outline'} onClick={handleCancelPasswordChange}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className='flex justify-end mt-10'>
                    <Button className='mr-10'>Save changes</Button>
                    <Button variant={'outline'}>Cancel</Button>
                  </div>
                </div>

                <div className={`${activeTab === 'account-vouchers' ? 'block' : 'hidden'}`}>
                  <div className=''>
                    <h5 className='mb-3 text-2xl font-semibold'>Voucher của bạn:</h5>
                    <div className='flex items-center justify-between p-2 mb-2 border border-muted-foreground'>
                      <div className='flex--1'>
                        <h6 className='text-lg font-semibold'>Voucher 1</h6>
                        <div className='flex items-center mt-2'>
                          <img
                            className='w-24 h-24 mr-5 rounded-md'
                            src='https://c8.alamy.com/comp/EMC7YT/special-discount-10-off-stamp-EMC7YT.jpg'
                            alt='Voucher 1'
                          />
                          <div>
                            <p>Description: 10% off on all products</p>
                            <p>Code: VOUCHER10</p>
                            <p className='text-muted-foreground'>Expires: 2023-12-31</p>
                          </div>
                        </div>
                      </div>
                      <Button variant={'destructive'} className='mx-10 '>
                        Dùng Voucher
                      </Button>
                    </div>
                    <div className='flex items-center justify-between p-2 mb-2 border border-muted-foreground'>
                      <div className='flex--1'>
                        <h6 className='text-lg font-semibold'>Voucher 1</h6>
                        <div className='flex items-center mt-2'>
                          <img
                            className='w-24 h-24 mr-5 rounded-md'
                            src='https://www.pngmart.com/files/8/Voucher-Download-PNG-Image.png'
                            alt='Voucher 1'
                          />
                          <div>
                            <p>Description: 10% off on all products</p>
                            <p>Code: VOUCHER10</p>
                            <p className='text-muted-foreground'>Expires: 2023-12-31</p>
                          </div>
                        </div>
                      </div>
                      <Button variant={'destructive'} className='mx-10 '>
                        Dùng Voucher
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={`${activeTab === 'account-notifications' ? 'block' : 'hidden'}`}>
                  <div>
                    <h3 className='text-lg font-semibold'>Đơn mua</h3>
                    <div className='flex items-center justify-between my-4'>
                      <img
                        className='object-cover w-20 h-20 rounded-md'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg'
                        alt='Notification 1'
                      />
                      <div className='flex-1 ml-4'>
                        <span>Đã xác nhận thanh toán. Đơn hàng vadj2341 đã được đặt vui lòng kiểm tra đơn hàng</span>
                      </div>
                      <Button>Xem chi tiết</Button>
                    </div>
                  </div>

                  <div>
                    <hr />
                    <h3 className='text-lg font-semibold'>Đơn đặt</h3>
                    <div className='flex items-center justify-between my-4'>
                      <img
                        className='object-cover w-20 h-20 rounded-md'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg'
                        alt='Notification 2'
                      />
                      <div className='flex-1 ml-4'>
                        <span>Đơn đặt của bạn đã có cập nhật mới từ shop, vui lòng kiểm tra</span>
                      </div>
                      <Button>Xem chi tiết</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Profile
