import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TeamLeague } from '../../models/team-league-model';
import {
  GameResultFixture,
  GameResultsFixturesInfo,
} from '../../models/game-fixtures-model';
import { SoccerInformationService } from '../../services/soccer-information.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { Unsubscribe } from '../../shared/unsubscribe';

@Component({
  selector: 'app-team-game-results',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  templateUrl: './team-game-results.component.html',
  styleUrl: './team-game-results.component.css',
})
export class TeamGameResultsComponent extends Unsubscribe implements OnInit {
  teamGameReusltsData: GameResultFixture[] = [];
  selectedTeamId!: string | null;
  private readonly soccerInfoService: SoccerInformationService = inject(
    SoccerInformationService
  );
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  loaderService: LoaderService = inject(LoaderService);
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  ngOnInit(): void {
    this.selectedTeamId = this.route.snapshot.paramMap.get('teamId');
    const selectedLeague: TeamLeague =
      JSON.parse(localStorage.getItem('selectedLeagueInfo')!) || [];
    this.getGameResultsFixturesForSelectedTeam(
      this.selectedTeamId,
      selectedLeague.league.id
    );
  }

  getGameResultsFixturesForSelectedTeam(
    id: string | null,
    leagueId: number
  ): void {
    this.soccerInfoService
      .getGameResultsFixturesForSelectedTeam(id, leagueId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: GameResultsFixturesInfo) => {
        this.teamGameReusltsData = res.response;
      });
  }

  backToSoccerTopLeaguesUpdatesPage(): void {
    this.router.navigate(['/']);
  }
}
