'use client'

import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { BackgroundImage } from '@/components/BackgroundImage'
import { Container } from '@/components/Container'

interface Day {
  name: string
  date: React.ReactNode
  dateTime: string
  artists: Array<{
    description: string | null
    type: string
    time: string
    image: string
    location: string
    price: number
    status: string
  }>
}

const events:Array<Day> = [
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
const eventsNextThreeDays = events.slice(0,3)
function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let smMediaQuery = window.matchMedia('(min-width: 640px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <Tab.Group
      as="div"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === 'vertical'}
    >
      <Tab.List className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pb-4 pl-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) => (
          <>
            {events.map((day, dayIndex) => (
              <div
                key={day.name}
                className={clsx(
                  'relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0',
                  dayIndex !== selectedIndex && 'opacity-70',
                )}
              >
                <DaySummary
                  day={{
                    ...day,
                    date: (
                      <Tab className="ui-not-focus-visible:outline-none">
                        <span className="absolute inset-0" />
                        {day.date}
                      </Tab>
                    ),
                  }}
                />
              </div>
            ))}
          </>
        )}
      </Tab.List>
      <Tab.Panels>
        {events.map((day) => (
          <Tab.Panel
            key={day.name}
            className="ui-not-focus-visible:outline-none"
          >
            <TimeSlots day={day} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

function DaySummary({ day }: { day: Day }) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight text-blue-900">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      {/* <p className="mt-1.5 text-base tracking-tight text-blue-900">
        {day.summary}
      </p> */}
    </>
  )
}

function TimeSlots({ day, className }: { day: Day; className?: string }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        'space-y-8 bg-white/60 px-10 py-14 text-center shadow-xl shadow-blue-900/5 backdrop-blur',
      )}
    >
      {day.artists.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.description}
          aria-label={`${timeSlot.description}  at ${timeSlot.time} - ${timeSlot.location}`}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight text-blue-900">
            {timeSlot.description}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight text-blue-900">
              {timeSlot.type}
            </p>
          )}
          <p className="mt-1 font-mono text-sm text-slate-500">
            <time dateTime={`${day.dateTime}T${timeSlot.time}-08:00`}>
              {timeSlot.time}
            </time>{' '}
            -{' '}
            <span>
            {timeSlot.description}
            </span>
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScheduleStatic() {
  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
      {eventsNextThreeDays.map((day) => (
        <section key={day.name}>
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl">
          Here we are for the next three days, brimming with talent, innovation and passion.
          </h2>
          <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
          Discover the most memorable events and the brightest minds in every field, so that your eyes will wonder and your mind will light up.
          Exclusive access is guaranteed by your secure ticket.
          </p>
        </div>
      </Container>
      <div className="relative mt-14 sm:mt-24">
        <BackgroundImage position="right" className="-bottom-32 -top-40" />
        <Container className="relative">
          <ScheduleTabbed />
          <ScheduleStatic />
        </Container>
      </div>
    </section>
  )
}
