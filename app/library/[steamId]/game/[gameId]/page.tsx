import axios from 'axios';
import Image from 'next/image';
import { Achievement, Game } from '../../../../lib/types';
import { tomorrow } from '../../../../lib/fonts';

const GamePage = async (props: {
  params: Promise<{ steamId: string; gameId: string }>;
}) => {
  const { steamId, gameId } = await props.params;
  let gameData: Game = {
    id: parseInt(gameId),
    boxArt: '',
    name: '',
    description: '',
    developers: [],
    backgroundImage: '',
    playtime: 0,
    achievements: [],
  };

  // TODO: change so that it's in a server component
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/getUserStatsForGame`,
      {
        params: {
          steamId: steamId,
          gameId: gameId,
        },
      },
    );
    // console.log(response);
    gameData = data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="grid justify-items-center">
      <div
        style={{ backgroundImage: `url(${gameData.backgroundImage})` }}
        className="bg-contain bg-no-repeat"
      >
        <div className={`p-24`}>
          <div className="grid grid-cols-3 gap-8">
            <div className="grid justify-items-center">
              <Image
                src={gameData.boxArt}
                alt={`${gameData.name}'s icon`}
                width={300}
                height={450}
                className="shadow-lg shadow-black/70 mt-2"
              />
            </div>
            <div className="col-span-2">
              <p className={`${tomorrow.className} text-6xl text-gray-300`}>
                {gameData.name}
              </p>
              <p
                className={`${tomorrow.className} text-gray-400 mb-4 pl-[3px]`}
              >
                {gameData.developers.join(',')}
              </p>
              <hr className="mb-1 border-gray-400" />
              <p
                className={`${tomorrow.className} text-gray-400 mb-8 pl-[3px]`}
              >
                {gameData.description}
              </p>
              <div className="grid grid-cols-10 gap-4 pl-[3px]">
                {gameData.achievements.map((achievement: Achievement) => (
                  <div key={achievement.id}>
                    {/* <span className="w-auto bg-gray-900 text-gray-300 z-1 relative hidden hover:block rounded-md p-[5px] text-center text-sm">
                  {achievement.name}
                </span> */}
                    <Image
                      src={achievement.icon}
                      alt={achievement.id}
                      width={64}
                      height={64}
                      className={`${
                        achievement.achieved ? 'opacity-100' : 'opacity-30'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
