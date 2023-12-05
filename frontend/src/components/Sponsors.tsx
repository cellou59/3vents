import Image from 'next/image'

import { Container } from '@/components/Container'
import logoAEG from '@/images/logos/AEG.png'
import logoCevent from '@/images/logos/C event.png'
import logoEventbrite from '@/images/logos/Eventbrite.png'
import logoInforma from '@/images/logos/Informa.png'
import logoLiveNation from '@/images/logos/live nation.png'
import logoReedExhibitions from '@/images/logos/Reed Exhibitions.png'

const sponsors = [
  { name: 'live nation', logo: logoLiveNation },
  { name: 'Reed Exhibitions', logo: logoReedExhibitions },
  { name: 'Informa', logo: logoInforma },
  { name: 'C event', logo: logoCevent },
  { name: 'AEG', logo: logoAEG },
  { name: 'Eventbrite', logo: logoEventbrite },
]

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-20 sm:py-32">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-blue-900 sm:text-5xl">
          Current sponsorships for our workshops and speakers.
        </h2>
        <div className="mx-auto mt-20 grid max-w-max grid-cols-1 place-content-center gap-x-32 gap-y-12 sm:grid-cols-3 md:gap-x-16 lg:gap-x-32">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center grayscale"
            >
              <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
