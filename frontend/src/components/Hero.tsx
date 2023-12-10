import { BackgroundImage } from '@/components/BackgroundImage'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function Hero() {
  return (
    <div className="relative py-20 sm:pb-24 sm:pt-16">
      <BackgroundImage className="-bottom-14 -top-36" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
            <span className="sr-only">3vents - </span>Your passport to unforgettable moments.
          </h1>
          <div className="mt-6 space-y-6 font-display text-xl tracking-tight text-blue-900">
            <p>
            Immerse yourself in a world of boundless events - exhilarating concerts, inspiring lectures, family shows and more. 
            Every ticket is a promise of memorable experiences and exciting discoveries.
            </p>
            <p>
            With 3vents, you have easy access to a diverse selection of events that will ignite your curiosity and awaken your passions. 
            Get ready to experience life-changing moments, one entry at a time. 
            Explore. Dream. Discover.
            </p>
            <p> 
            Explore. Dream. Discover.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ['3vents', '18'],
              ['Life experiences', '12,091'],
              ['Country', '12'],
              ['Gifts won', '20473'],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-blue-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}
