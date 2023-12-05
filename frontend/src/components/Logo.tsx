import Image from 'next/image'
import logo from '@/images/logos/3vents.png'
export function Logo(props: React.ComponentPropsWithoutRef<'png'>) {
  return (
    <Image
      className="h-15 w-15 border rounded-full"
      src={logo}
      alt=""
      width={100}
      height={100}
      priority 
      />
  )
}
