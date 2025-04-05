import axios from 'axios';
import { Game } from '../../lib/types';
import Link from 'next/link';
import { tomorrow } from '../../lib/fonts';
import BoxArt from '../../components/boxArt';

export default async function Page(props: {
  params: Promise<{ steamId: string }>;
}) {
  const params = await props.params;
  const steamId = params.steamId;
  let libraryData;

  const BASE_URL =
    process.env.NEXT_PUBLIC_DEV_MODE === 'true'
      ? process.env.NEXT_PUBLIC_DEV_URL
      : process.env.NEXT_PUBLIC_PROD_URL;

  try {
    const response = await axios.get(`${BASE_URL}/api/getOwnedGames`, {
      params: {
        steamId: steamId,
        sortByPlaytime: true,
      },
    });
    libraryData = response;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="p-8">
      <h1
        className={`${tomorrow.className} text-6xl text-gray-300 grid justify-items-center mb-8`}
      >
        LIBRARY
      </h1>
      <div className="flex grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 md:gap-4">
        {libraryData?.data.map((game: Game) => (
          <div
            key={game.id}
            className="shadow-lg shadow-black/70 group relative"
          >
            <p
              className={`absolute ${
                game.name.length > 25 ? ' w-[175px]' : 'w-max'
              } -top-[25px] left-1/2 transform -translate-x-1/2 left-0 bg-gray-900 text-white px-[6px] rounded-md invisible group-hover:visible text-center z-10`}
            >
              {game.name}
              <br />
              {(game.playtime / 60).toFixed(1)} hours
            </p>
            <Link
              key={game.id}
              href={`/library/${steamId}/game/${game.id}`}
              className="grid justify-items-center"
            >
              <BoxArt game={game} key={game.id} style="w-full" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
