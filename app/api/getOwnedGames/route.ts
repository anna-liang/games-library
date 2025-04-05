import axios from 'axios';
import { GetOwnedSteamGamesResponse, Game } from '../../lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const steamId = request.nextUrl.searchParams.get('steamId');
  const sortByPlaytime = request.nextUrl.searchParams.get('sortByPlaytime');

  if (steamId === null) {
    return new Response('Missing parameter steamId', { status: 400 });
  }
  try {
    const response: GetOwnedSteamGamesResponse = await axios.get(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true&format=json`,
    );
    // console.log(response.data.response);
    const responseFormatted: Game[] = response.data.response.games.map(
      (game) => {
        return {
          id: game.appid,
          boxArt: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900.jpg`,
          name: game.name,
          description: '',
          developers: [],
          backgroundImage: '',
          playtime: game.playtime_forever,
          achievements: [],
          perfection: false,
        };
      },
    );
    // console.log(responseFormatted);
    if (sortByPlaytime) {
      responseFormatted.sort((gameA, gameB) => gameB.playtime - gameA.playtime);
    }
    return NextResponse.json(responseFormatted);
  } catch (error) {
    console.error(error);
  }
}
