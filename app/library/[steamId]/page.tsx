import axios from 'axios';
import Image from 'next/image';
import { Game } from '../../lib/types';
import Link from 'next/link';

export default async function Page(props: {
  params: Promise<{ steamId: string }>;
}) {
  const params = await props.params;
  const steamId = params.steamId;
  console.log(steamId);
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
    // console.log(response);
    libraryData = response;
  } catch (error) {
    console.error(error);
  }
  // console.log(libraryData);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <p>Library</p>
        {libraryData?.data.map((game: Game) => (
          <Link key={game.id} href={`/library/${steamId}/game/${game.id}`}>
            <Image
              src={game.boxArt}
              alt={`${game.name}'s icon`}
              width={150}
              height={225}
            />
            <p>{game.name}</p>
            <p>{game.playtime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
