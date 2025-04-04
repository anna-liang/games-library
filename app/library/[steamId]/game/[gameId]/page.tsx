import axios from 'axios';
import Image from 'next/image';
import { Achievement, Game } from '../../../../lib/types';
import { tomorrow } from '../../../../lib/fonts';
import BoxArt from '../../../../components/boxArt';
import PerfectionRibbon from '../../../../../public/perfection-ribbon.png';

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
    perfection: false,
  };

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
              <BoxArt game={gameData} style="shadow-lg shadow-black/70" />
            </div>
            <div className="col-span-2">
              <div className="relative flex flex-row">
                <p
                  className={`${tomorrow.className} float-left text-6xl text-gray-300 mb-1 mr-2`}
                >
                  {gameData.name}
                </p>
                <div className="ml-8">
                  <Image
                    src={PerfectionRibbon}
                    alt="perfection ribbon"
                    width={50}
                    height={70}
                    className={`${
                      gameData.perfection ? 'block' : 'hidden'
                    } absolute top-0 right-0`}
                  />
                </div>
              </div>
              <p className={`${tomorrow.className} text-gray-400 pl-[3px]`}>
                {gameData.developers.join(', ')}
              </p>
              {/* <p
                className={`${tomorrow.className} text-blue-400 mb-4 pl-[3px]`}
              >
                TOTAL PLAY TIME: 2h 3m
              </p> */}
              <hr className="mb-1 border-gray-400" />
              <p
                className={`${tomorrow.className} text-gray-400 mb-8 pl-[3px]`}
              >
                {gameData.description}
              </p>
              <div className="grid grid-cols-10 gap-4 pl-[3px]">
                {gameData.achievements.map((achievement: Achievement) => (
                  <div
                    key={achievement.id}
                    className="group relative text-center"
                  >
                    <p className="absolute w-max -top-[25px] left-1/2 transform -translate-x-1/2 left-0 bg-gray-900 text-white px-[6px] rounded-md invisible group-hover:visible">
                      {achievement.name}
                    </p>
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
