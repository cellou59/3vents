import { useRouter } from 'next/router';
import { events } from "@/constants/db";
import { Day, Artist } from "@/types/types";
import Purchase from '@/components/Purchase';

export default function EventPage({ params }: { params: any }) {
  const { artistName } = params;
  const event: Day | undefined = events.find((day: Day) =>
    day.artists.some((artist: Artist) => artist.description === artistName)
  );
  console.log('🚀 ~ file: page.tsx:10 ~ EventPage ~ event:', event);

  // Trouver l'artiste spécifique maintenant que nous avons le bon "Day"
  const artist: Artist | undefined = event?.artists.find((artist: Artist) => artist.description === artistName);

  // Gérer le cas où l'événement ou l'artiste n'est pas trouvé
  // if (!artist) {
  //   return <h1>{events[1].artists[0].description}</h1>;
  // }

  return(
    <>
     <h1>ececve</h1>
    {/* <Purchase/>  */}
    </>
  ) 
}
  
 

