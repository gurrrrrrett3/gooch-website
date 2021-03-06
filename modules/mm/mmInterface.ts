import mmCaching from "./mmCaching";
import mmApi from "./mmFetch";
import mmLeaderboard from "./mmLeaderboard";
import { mmFetchPlayerReturn, mmFetchPlayersReturn, mmFetchSessionsReturn, Session } from "./mmTypes";

const Cache = new mmCaching();

export default class mmInterface {
  public static formatPlanDate(date: string) {
    const dateArr = date.split(" ");
    const cleanDateArr = dateArr.map((date) => {
      return parseInt(date.replace(/\D/g, ""));
    });
    const length = dateArr.length;
    let time = 0;

    let sec = cleanDateArr[length - 1];
    let min = cleanDateArr[length - 2];
    let hour = cleanDateArr[length - 3];
    let day = cleanDateArr[length - 4];

    if (day) time += day * 24 * 60 * 60;
    if (hour) time += hour * 60 * 60;
    if (min) time += min * 60;
    if (sec) time += sec;

    return time;
  }

  public static async generatePlayerList() {
    const sessions = await mmInterface.getOnlineSessons();
    let players: string[] = [];

    sessions.forEach((session) => {
      players.push(session.name);
    });
  }

  public static getPlayer(playerName: string) {
    const data = Cache.loadCachedPlayer(playerName);
    return data as mmFetchPlayerReturn;
  }

  public static getPlayers() {
    return Cache.loadCache("players") as mmFetchPlayersReturn;
  }

  public static async fetchPlayer(playerName: string) {
    const data = (await mmApi.fetch({
      endpoint: "player",
      player: playerName,
    })) as mmFetchPlayerReturn;

    Cache.saveCachedPlayer(playerName, data);

    return data;
  }

  public static async getOnlineSessons() {
    const data = (await mmApi.fetch({
      endpoint: "sessions",
      timestamp: Date.now(),
    })) as mmFetchSessionsReturn;

    let out: Session[] = [];

    data.sessions.forEach((session) => {
      if (session.start.includes("Online")) {
        out.push(session);
      }
    });

    return out;
  }

  public static async getLeaderboard(type: LeaderboardType, stat?: "total" | "week" | "month") {
    stat = stat || "total";
    switch (type) {
      case "playtime":
        return await mmLeaderboard.playtime(stat);
      case "mobkills":
        return await mmLeaderboard.mobKills(stat);
      case "playerkills":
        return await mmLeaderboard.playerKills(stat);
      default:
        return null;
    }
  }
}

type LeaderboardType = "playtime" | "mobkills" | "playerkills" | "deaths" | "kd";
