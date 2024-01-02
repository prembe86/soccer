import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamLeague, TeamLeagueInfo } from '../models/team-league-model';
import { TeamStandingsInfo } from '../models/team-standing-model';
import { GameResultsFixturesInfo } from '../models/game-fixtures-model';

@Injectable({
  providedIn: 'root'
})
export class SoccerInformationService {
  applicationBaseUrl: string = 'https://v3.football.api-sports.io/';
  constructor(private readonly http: HttpClient) {}

  getTeamLeaguesList(): Observable<TeamLeagueInfo> {
    return this.http.get<TeamLeagueInfo>(`${this.applicationBaseUrl}leagues`);
  }

  getSelectedCountryStandingsList(
    leagueInfo: TeamLeague
  ): Observable<TeamStandingsInfo> {
    const d = new Date();
    const year = d.getFullYear();
    return this.http.get<TeamStandingsInfo>(
      `${this.applicationBaseUrl}standings?league=${leagueInfo?.league?.id}&season=2023`
    );
  }

  getGameResultsFixturesForSelectedTeam(teamId: string | null, leagueId: number): Observable<GameResultsFixturesInfo> {
    const d = new Date();
    const year = d.getFullYear();
    const status = 'FT';
    return this.http.get<GameResultsFixturesInfo>(
      `${this.applicationBaseUrl}fixtures?team=${teamId}&season=2023&league=${leagueId}&last=10&status=${status}`
    );
  }
}
