import axios from 'axios';
import Image from 'next/image';
import { Game } from '../../lib/types';
import Link from 'next/link';
import { tomorrow } from '../../lib/fonts';

export default async function Page(props: {
  params: Promise<{ steamId: string }>;
}) {
  const params = await props.params;
  const steamId = params.steamId;
  let libraryData;

  // TODO: change so that it's in a server component
  try {
    const response = await axios.get(
      `http://localhost:3000/api/getOwnedGames`,
      {
        params: {
          steamId: steamId,
          sortByPlaytime: true,
        },
      },
    );
    libraryData = response;
  } catch (error) {
    console.error(error);
  }

  // const handleImageError = () => {
  //   console.log('cannot find this image');
  // };

  return (
    <div className="p-8">
      <h1
        className={`${tomorrow.className} text-6xl text-gray-300 grid justify-items-center mb-8`}
      >
        LIBRARY
      </h1>
      <div className="flex grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-8">
        {libraryData?.data.map((game: Game) => (
          <div key={game.id} className="shadow-lg shadow-black/70">
            <Link
              key={game.id}
              href={`/library/${steamId}/game/${game.id}`}
              className="grid justify-items-center"
            >
              <Image
                src={game.boxArt}
                alt={`${game.name}'s icon`}
                width={600}
                height={900}
                // onError={handleImageError} // can't be passed to client component props
              />
              {/* <p>{game.name}</p>
                <p>{(game.playtime / 60).toFixed(1)}</p> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
