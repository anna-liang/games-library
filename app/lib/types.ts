interface SteamGame {
  appid: number;
  img_icon_url: string;
  name: string;
  playtime_disconnected: number;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
  rtime_last_played: number;
}

export interface GetOwnedSteamGamesResponse {
  data: {
    response: {
      game_count: number;
      games: SteamGame[];
    };
  };
}

interface Stat {
  name: string;
  value: number;
}

export interface Achievement {
  id: string;
  name: string;
  achieved: boolean;
  icon: string;
}

export interface UserAchievement {
  name: string;
  achieved: boolean;
}

interface SchemaStat {
  name: string;
  defaultValue: number;
  displayName: string;
}

interface SchemaAchievement {
  name: string;
  defaultValue: number;
  displayName: string;
  hidden: boolean;
  icon: string;
  icongray: string;
}

export interface GetSchemaForGameResponse {
  data: {
    game: {
      gameName: string;
      gameVersion: string;
      availableGameStats: {
        stats: SchemaStat[];
        achievements: SchemaAchievement[];
      };
    };
  };
}

export interface GetUserStatsForGameResponse {
  data: {
    playerstats: {
      steamID: string;
      gameName: string;
      stats: Stat[];
      achievements: UserAchievement[];
    };
  };
}

export interface Game {
  id: number;
  boxArt: string;
  name: string;
  playtime: number;
  achievements: Achievement[];
}
