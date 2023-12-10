"use client";

import { useState, useEffect} from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { Performer } from "@/types/types";
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
interface Props {
    performer: Performer | null
}
interface TicketType {
    grade: string;
    discount: number;
    availability: boolean;
  }
  
export const ticketTypes: TicketType[] = [
{
    grade: 'EarlyBird',
    discount: -10,
    availability: true,
},
{
    grade: 'Regular',
    discount: 0,
    availability: true,
},
{
    grade: 'Premium',
    discount: 10,
    availability: true,
},
{
    grade: 'VIP',
    discount: 20,
    availability: true,
},
];
  


const reviews = { average: 4, totalCount: 1624 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Purchase({performer}: Props) {
    const pathname = usePathname()
    const breadcrumbs = [
        { id: 1, name: 'Event', href: '/' },
        { id: 2, name: performer?.name, href: '#' },
    ]

    useEffect(() => {
    console.log('🚀 ~ file: Purchase.tsx:64 ~ useEffect ~ pathname:', pathname)
}, [pathname])


    const [selectedType, setSelectedType] = useState(ticketTypes[0])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <a href={breadcrumb.href} className="font-medium text-gray-500 hover:text-gray-900">
                      {breadcrumb.name}
                    </a>
                    {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{performer?.name}</h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Event information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">{performer?.type}</p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{performer?.description }</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
              <p className="ml-2 text-sm text-gray-500">Tickets available for immediate booking</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            {performer?.image ? (
            <Image 
                src={performer.image}
                alt={performer.description || 'Description'}
                width={200}
                height={200}
                priority 
                className="h-full w-full object-cover object-center"
            />
            ) : (
            // Vous pouvez afficher une image par défaut ou un autre élément ici
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">Image non disponible</div>
            )}
        </div>
        </div>


        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Event options
            </h2>

            <form>
              <div className="sm:flex sm:justify-between">
                {/* Size selector */}
                <RadioGroup value={selectedType} onChange={setSelectedType}>
                  <RadioGroup.Label className="block text-sm font-medium text-gray-700">Class</RadioGroup.Label>
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {ticketTypes.map((type) => (
                     type.availability && ( <RadioGroup.Option
                        as="div"
                        key={type.grade}
                        value={type}
                        className={({ active }) =>
                          classNames(
                            active ? 'ring-2 ring-indigo-500' : '',
                            'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="p" className="text-base font-medium text-gray-900">
                              {type.grade} 
                            </RadioGroup.Label>
                            <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                            {
                                performer && typeof performer.price === 'number' && typeof type.discount === 'number' ? 
                                `${((100 + type.discount) / 100 * performer.price).toFixed(2)}€` :
                                'unavailable'
                            }

                            </RadioGroup.Description>
                            <div
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked ? 'border-indigo-500' : 'border-transparent',
                                'pointer-events-none absolute -inset-px rounded-lg'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>)
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-4">
                <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                  <span>What grade should I buy?</span>
                  <QuestionMarkCircleIcon
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Purchase ticket
                </button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-base font-medium">
                  <SparklesIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">fun Guarantee</span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
