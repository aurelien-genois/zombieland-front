import RegisterForm from './RegisterForm'
import './RegisterPage.css'

export default function RegisterPage() {
  return(
    <>
    <div className='bg-gray-300 pt-16 sm:pt-20 min-h-[calc(100svh-5rem-1.45rem)]'>
      <RegisterForm />
    </div>
    </>
  )
}