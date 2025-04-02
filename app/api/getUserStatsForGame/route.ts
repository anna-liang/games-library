import axios from 'axios';
import {
  Game,
  GetSchemaForGameResponse,
  GetUserStatsForGameResponse,
} from '../../lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('GET /getUserStatsForGame');
  const steamId = request.nextUrl.searchParams.get('steamId');
  const gameId = request.nextUrl.searchParams.get('gameId');

  if (steamId === null) {
    return new Response('Missing parameter steamId', { status: 400 });
  }
  if (gameId === null) {
    return new Response('Missing parameter gameId', { status: 400 });
  }

  const responseFormatted: Game = {
    id: parseInt(gameId),
    boxArt: '',
    name: '',
    description: '',
    developers: [],
    backgroundImage: '',
    playtime: 0,
    achievements: [],
  };
  // Fetch schema for requested game
  try {
    const response: GetSchemaForGameResponse = await axios.get(
      `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${process.env.STEAM_API_KEY}&appid=${gameId}`,
    );
    responseFormatted.boxArt = `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/library_600x900.jpg`;
    if (response.data.game?.availableGameStats) {
      responseFormatted.achievements =
        response.data.game?.availableGameStats?.achievements.map(
          (achievement) => {
            return {
              id: achievement.name,
              name: achievement.displayName,
              icon: achievement.icon,
              achieved: false,
            };
          },
        );
    }
  } catch (error) {
    console.error(error);
  }
  try {
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${gameId}`,
    );
    responseFormatted.name = response.data[`${gameId}`].data.name;
    responseFormatted.description =
      response.data[`${gameId}`].data.short_description;
    responseFormatted.backgroundImage =
      response.data[`${gameId}`].data.background;
    responseFormatted.developers = response.data[`${gameId}`].data.developers;
  } catch (error) {
    console.error(error);
  }
  // Fetch use stats for requested game
  try {
    const response: GetUserStatsForGameResponse = await axios.get(
      `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&appid=${gameId}`,
    );
    // Updated the achieved achievements
    response.data.playerstats.achievements?.forEach((userAchievement) => {
      const index = responseFormatted.achievements?.findIndex(
        (achievement) => achievement.id === userAchievement.name,
      );
      if (index !== undefined && index >= 0) {
        responseFormatted.achievements[index].achieved = true;
      }
    });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json(responseFormatted);
}
