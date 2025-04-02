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
              <BoxArt game={game} key={game.id} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
