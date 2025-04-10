import axios from 'axios';
import { Game } from '../../lib/types';
import GameCard from '../../components/gameCard';
import { tomorrow } from '../../lib/fonts';

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
          <GameCard game={game} steamId={steamId} key={game.id} />
        ))}
      </div>
    </div>
  );
}
