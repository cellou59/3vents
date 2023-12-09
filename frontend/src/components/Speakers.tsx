'use client'

import { useEffect, useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { DiamondIcon } from '@/components/DiamondIcon'

const events = [
  {
    name: 'Tuesday',
    date: 'December 12',
    dateTime: '2023-12-12',
    artists: [
      {
        description: 'John Mayer',
        type: 'Concert',
        time: '19:00',
        image: 'https://i.pinimg.com/474x/d3/5b/e4/d35be4bec547e5c27a43fba00a942215.jpg',
        location: 'Los Angeles',
        price: 30,
        status: 'Available',
      },
      {
        description: 'David Guetta',
        type: 'Workshop',
        time: '14:30',
        image: 'https://i.pinimg.com/474x/62/13/38/621338e2bc98b286c9cb74ef2e39b4bf.jpg',
        location: 'Los Angeles',
        price: 30,
        status: 'Available',
      },
      {
        description: 'Taylor Swift',
        type: 'Concert',
        time: '20:15',
        image: 'https://i.pinimg.com/474x/d4/e1/b2/d4e1b2fd5da8f70bc716ddb98ffa9397.jpg',
        location: 'Chicago',
        price: 45,
        status: 'Available',
      },
      {
        description: 'Ed Sheeran',
        type: 'Concert',
        time: '21:30',
        image: 'https://i.pinimg.com/474x/f8/59/09/f859095b71a8cf5df2f9eca65faf31c4.jpg',
        location: 'San Francisco',
        price: 25,
        status: 'Sold Out',
      },
      {
        description: 'Tim Cook',
        type: 'Conference',
        time: '13:00',
        image: 'https://i.pinimg.com/474x/b8/94/89/b894894eb688a3f793201d71b4f6fd64.jpg',
        location: 'Miami',
        price: 55,
        status: 'Available',
      },
    ],
  },
  {
    name: 'Wednesday',
    date: 'December 13',
    dateTime: '2023-12-13',
    artists: [
      {
        description: 'Elon Musk',
        type: 'Conference',
        time: '16:00',
        image: 'https://i.pinimg.com/474x/62/1f/65/621f6520daaa29ad338da19b45ae3b7c.jpg',
        location: 'Los Angeles',
        price: 50,
        status: 'Available',
      },
      {
        description: 'Sheryl Sandberg',
        type: 'Conference',
        time: '11:30',
        image: 'https://i.pinimg.com/474x/87/7b/00/877b00d934a3a2e84ddbc808d21a1b94.jpg',
        location: 'New York City',
        price: 60,
        status: 'Sold Out',
      },
      {
        description: 'Armin van Buuren',
        type: 'Workshop',
        time: '15:00',
        image: 'https://i.pinimg.com/474x/f7/62/d4/f762d45bc79352dd2417a6dfd03f19fc.jpg',
        location: 'Chicago',
        price: 45,
        status: 'Available',
      },
      {
        description: 'Satya Nadella',
        type: 'Conference',
        time: '14:30',
        image: 'https://i.pinimg.com/474x/04/4a/d1/044ad1c2782c79cafff70ec9ade95d20.jpg',
        location: 'Chicago',
        price: 45,
        status: 'Available',
      },
      {
        description: 'Martin Garrix',
        type: 'Workshop',
        time: '13:30',
        image: 'https://i.pinimg.com/474x/e7/9b/da/e79bdafc7294180697e7d4b58d156104.jpg',
        location: 'Miami',
        price: 35,
        status: 'Available',
      },
    ],
  },
  {
    name: 'Thursday',
    date: 'December 14',
    dateTime: '2023-12-14',
    artists: [
      {
        description: 'Bruno Mars',
        type: 'Concert',
        time: '21:45',
        image: 'https://i.pinimg.com/474x/c6/a1/68/c6a1686b7707aead89c5aa6ffbd41454.jpg',
        location: 'Miami',
        price: 35,
        status: 'Available',
      },
      {
        description: 'Calvin Harris',
        type: 'Workshop',
        time: '11:00',
        image: 'https://i.pinimg.com/474x/70/4c/f9/704cf9dbcd37f8aa799452947b9e8879.jpg',
        location: 'New York City',
        price: 40,
        status: 'Sold Out',
      },
      {
        description: 'Barack Obama',
        type: 'Conference',
        time: '16:00',
        image: 'https://i.pinimg.com/474x/cf/f3/48/cff3482226e8409a8a54f0be9b365c2a.jpg',
        location: 'San Francisco',
        price: 55,
        status: 'Sold Out',
      },
      {
        description: 'Andy Warhol',
        type: 'Exhibition',
        time: '16:30',
        image: 'https://i.pinimg.com/474x/95/37/a5/9537a53de426f19954fc076fa934a2d0.jpg',
        location: 'San Francisco',
        price: 40,
        status: 'Sold Out',
      },
      {
        description: 'Hardwell',
        type: 'Workshop',
        time: '16:30',
        image: 'https://i.pinimg.com/474x/97/35/9a/97359ab44d83e0b4ff37e540d87621f3.jpg',
        location: 'San Francisco',
        price: 25,
        status: 'Sold Out',
      },
    ],

  },
  {
    name: 'Friday',
    date: 'December 15',
    dateTime: '2023-12-15',
    artists: [
      {
        description: 'Pablo Picasso',
        type: 'Exhibition',
        time: '10:30',
        image: 'https://i.pinimg.com/474x/98/1a/52/981a52f016e6526d00e04a428ec1469c.jpg',
        location: 'Paris',
        price: 20,
        status: 'Available',
      },
      {
        description: 'Leonardo da Vinci',
        type: 'Exhibition',
        time: '12:00',
        image: 'https://i.pinimg.com/474x/8f/f3/4c/8ff34c7cc25f1425ec6b8d3c1ce673ed.jpg',
        location: 'London',
        price: 25,
        status: 'Sold Out',
      },
      {
        description: 'Rihanna',
        type: 'Performance',
        time: '21:00',
        image: 'https://i.pinimg.com/474x/ef/76/c3/ef76c346e6376cf058f6e3317069cb46.jpg',
        location: 'Miami',
        price: 65,
        status: 'Available',
      },
      {
        description: 'Frida Kahlo',
        type: 'Exhibition',
        time: '15:00',
        image: 'https://i.pinimg.com/474x/18/45/ad/1845add0f273c2f57233a0b3fb55b73f.jpg',
        location: 'Los Angeles',
        price: 35,
        status: 'Available',
      },
      // {
      //   description: 'Tim Cook',
      //   type: 'Conference',
      //   time: '13:00',
      //   image: 'https://i.pinimg.com/474x/b8/94/89/b894894eb688a3f793201d71b4f6fd64.jpg',
      //   location: 'Miami',
      //   price: 55,
      //   status: 'Available',
      // },
    ],
  },
  {
    name: 'Saturday',
    date: 'December 16',
    dateTime: '2023-12-16',
    artists: [
      {
        description: 'Beyoncé',
        type: 'Performance',
        time: '18:00',
        image: 'https://i.pinimg.com/474x/2a/b5/4f/2ab54f27287c1073edbc1fc16db78693.jpg',
        location: 'Los Angeles',
        price: 55,
        status: 'Available',
      },
      {
        description: 'Lady Gaga',
        type: 'Performance',
        time: '19:30',
        image: 'https://i.pinimg.com/474x/10/77/b6/1077b6b8d8b90b4350e46209dbaf4c7a.jpg',
        location: 'New York City',
        price: 60,
        status: 'Sold Out',
      },
      {
        description: 'Vincent van Gogh',
        type: 'Exhibition',
        time: '13:30',
        image: 'https://i.pinimg.com/474x/65/a1/9d/65a19d851442d5816097cadbae1c34fa.jpg',
        location: 'New York City',
        price: 30,
        status: 'Available',
      },
  
      {
        description: 'Justin Timberlake',
        type: 'Performance',
        time: '22:30',
        image: 'https://i.pinimg.com/474x/cb/f7/0d/cbf70de1e78293143a45329429d7ad84.jpg',
        location: 'Chicago',
        price: 70,
        status: 'Available',
      },
      {
        description: 'Alicia Keys',
        type: 'Concert',
        time: '20:30',
        image: 'https://i.pinimg.com/474x/b3/7c/47/b37c47186efef28e3d6ffa0d323c7a8a.jpg',
        location: 'New York City',
        price: 40,
        status: 'Sold Out',
      },
      {
        description: 'Adele',
        type: 'Performance',
        time: '21:00',
        image: 'https://i.pinimg.com/474x/bd/0f/73/bd0f737d959bf6e98f4879a31ad7d5ea.jpg',
        location: 'San Francisco',
        price: 75,
        status: 'Sold Out',
      },
    ],
  },
];

function ImageClipPaths({
  id,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & { id: string }) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Speakers() {
  let id = useId()
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-20 sm:py-32"
    >
      <ImageClipPaths id={id} />
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl"
          >
            3vents
          </h2>
          <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
          Join event enthusiasts from all over the world and experience the most spellbinding performances from local stages to major international stadiums.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4"
          vertical={tabOrientation === 'vertical'}
        >
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-0 left-0.5 top-2 hidden w-px bg-slate-200 lg:block" />
            <Tab.List className="grid auto-cols-auto grid-flow-col justify-start gap-x-8 gap-y-10 whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center lg:grid-flow-row lg:grid-cols-1 lg:text-left">
              {({ selectedIndex }) => (
                <>
                  {events.map((event, eventIndex) => (
                    <div key={event.dateTime} className="relative lg:pl-8">
                      <DiamondIcon
                        className={clsx(
                          'absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block',
                          eventIndex === selectedIndex
                            ? 'fill-blue-600 stroke-blue-600'
                            : 'fill-transparent stroke-slate-400',
                        )}
                      />
                      <div className="relative">
                        <div
                          className={clsx(
                            'font-mono text-sm',
                            eventIndex === selectedIndex
                              ? 'text-blue-600'
                              : 'text-slate-500',
                          )}
                        >
                          <Tab className="ui-not-focus-visible:outline-none">
                            <span className="absolute inset-0" />
                            {event.name}
                          </Tab>
                        </div>
                        <time
                          dateTime={event.dateTime}
                          className="mt-1.5 block text-2xl font-semibold tracking-tight text-blue-900"
                        >
                          {event.date}
                        </time>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Tab.List>
          </div>
          <Tab.Panels className="lg:col-span-3">
            {events.map((event) => (
              <Tab.Panel
                key={event.dateTime}
                className="grid grid-cols-1 gap-x-8 gap-y-10 ui-not-focus-visible:outline-none sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3"
                unmount={false}
              >
                {event.artists.map((artist, artistIndex) => (
                  <div key={artistIndex}>
                    <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl">
                      <div
                        className={clsx(
                          'absolute bottom-6 left-0 right-4 top-0 rounded-4xl border transition duration-300 group-hover:scale-95 xl:right-6',
                          [
                            'border-blue-300',
                            'border-indigo-300',
                            'border-sky-300',
                          ][artistIndex % 3],
                        )}
                      />
                      <div
                        className="absolute inset-0 bg-indigo-50"
                        style={{ clipPath: `url(#${id}-${artistIndex % 3})` }}
                      >
                        <Link href={`/event/${artist.description}`}>
                        <Image
                          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                          src={artist.image}
                          alt=""
                          width={200}
                          height={200}
                          priority
                          sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                        </Link>
                      </div>

                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-900">
                      {artist.name}
                    </h3>
                    <p className="mt-1 text-base tracking-tight text-slate-500">
                      {artist.type}
                    </p>
                    <p className="mt-1 text-base tracking-tight text-slate-500">
                      {artist.time}
                    </p>
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </Container>
    </section>
  )
}
