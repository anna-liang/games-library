import axios from 'axios';
import Image from 'next/image';
import { Achievement } from '../../../../lib/types';

const GamePage = async (props: {
  params: Promise<{ steamId: string; gameId: string }>;
}) => {
  const { steamId, gameId } = await props.params;
  let gameData;

  // TODO: change so that it's in a server component
  try {
    const response = await axios.get(
      `http://localhost:3000/api/getUserStatsForGame`,
      {
        params: {
          steamId: steamId,
          gameId: gameId,
        },
      },
    );
    // console.log(response);
    gameData = response;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <p>Game {gameId}</p>
        <p>{gameData?.data.name}</p>
        <Image
          src={gameData?.data.boxArt}
          alt={`${gameData?.data.name}'s icon`}
          width={250}
          height={375}
        />
        <div>
          {gameData?.data.achievements.map((achievement: Achievement) => (
            <div key={achievement.id}>
              <p key={achievement.id}>{achievement.name}</p>
              <Image
                src={achievement.icon}
                alt={achievement.id}
                width={50}
                height={50}
                style={{ opacity: achievement.achieved ? 1 : 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
