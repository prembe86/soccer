import { Component, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TeamStandingsInfo, TeamStnding } from '../../models/team-standing-model';
import {
  Country,
  TeamLeague,
  TeamLeagueInfo,
} from '../../models/team-league-model';
import { Router } from '@angular/router';
import { SoccerInformationService } from '../../services/soccer-information.service';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { COUNTRY_LEAGUE_IDS } from '../../constants/soccer-updates-constant';
import { LoaderService } from '../../services/loader.service';
import { Unsubscribe } from '../../shared/unsubscribe';

@Component({
  selector: 'app-soccer-top-leagues-home',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, AsyncPipe],
  templateUrl: './soccer-top-leagues-home.component.html',
  styleUrl: './soccer-top-leagues-home.component.css',
})
export class SoccerTopLeaguesHomeComponent
  extends Unsubscribe
  implements OnInit
{
  countriesList: Country[] = [];
  teamLeaguesList: TeamLeague[] = [];
  teamStandingInfo: TeamStnding[] = [];
  selectedLeagueId!: number;
  private readonly soccerInfoService: SoccerInformationService = inject(
    SoccerInformationService
  );
  private readonly router: Router = inject(Router);
  loaderService: LoaderService = inject(LoaderService);
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  ngOnInit(): void {
    this.getTeamLeaguesList();
  }

  getTeamLeaguesList(): void {
    this.soccerInfoService
      .getTeamLeaguesList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: TeamLeagueInfo) => {
        if (res?.response?.length) {
          this.teamLeaguesList = res.response.filter(
            (leagueInfo: TeamLeague) =>
              COUNTRY_LEAGUE_IDS.find(
                (element: number) => element === leagueInfo.league.id
              ) === leagueInfo.league.id
          );
          const selectedLeague: TeamLeague =
            JSON.parse(localStorage.getItem('selectedLeagueInfo')!) ||
            this.teamLeaguesList[0];
          this.getSelectedCountryStandingsList(selectedLeague);
        }
      });
  }

  getSelectedCountryStandingsList(leagueInfo: TeamLeague): void {
    this.selectedLeagueId = leagueInfo?.league?.id;
    localStorage.setItem('selectedLeagueInfo', JSON.stringify(leagueInfo));
    this.soccerInfoService
      .getSelectedCountryStandingsList(leagueInfo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: TeamStandingsInfo) => {
        this.teamStandingInfo = res.response;
      });
  }

  navigateToTeamGameResults(teamId: number): void {
    this.router.navigate(['team-game-results', teamId]);
  }
}
