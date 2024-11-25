import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/games.interface';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
})
export class GamesListComponent {
  games: Game[] = [];
  displayedGames: Game[] = [];
  totalGames = 0;
  loading = true;
  currentPage = 1;
  pageSize = 5;
  sortField: keyof Game | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  skeletonItems = new Array(5).fill(0);

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGameList();
  }

  loadGameList() {
    this.loading = true;
    const offset = (this.currentPage - 1) * this.pageSize;
    this.gameService.getGameList(this.pageSize, offset).subscribe({
      next: (response) => {
        this.games = response.games;
        this.totalGames = response.total;
        this.updateDisplayedGames();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching game list:', error);
        this.loading = false;
      },
    });
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalGames) {
      this.currentPage++;
      this.loadGameList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGameList();
    }
  }

  updateDisplayedGames() {
    let sortedGames = [...this.games];
    if (this.sortField) {
      sortedGames.sort((a, b) => {
        const aValue = a[this.sortField!];
        const bValue = b[this.sortField!];
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    this.displayedGames = sortedGames;
  }

  sort(field: keyof Game) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.updateDisplayedGames();
  }

  getSortClass(field: keyof Game): string {
    if (this.sortField === field) {
      return this.sortDirection === 'asc' ? 'ascending' : 'descending';
    }
    return '';
  }

  trackByGameId(index: number, game: Game) {
    return game.id;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.totalGames);
  }

  viewGameInfo(game: Game) {
    const infoWindow = window.open('', '_blank', 'width=400,height=300');
    if (infoWindow) {
      infoWindow.document.write(`
        <h2>${game.title}'s Information</h2>
        <img src="${game.thumbnail}" alt="${game.title}">
        <p><strong>Genre:</strong> ${game.genre}</p>
        <p><strong>Release Date:</strong> ${game.release_date}</p>
        <p><strong>Platform:</strong> ${game.platform}</p>
      `);
    }
  }

  deleteGame(game: Game) {
    const index = this.games.findIndex((g) => g.id === game.id);
    if (index !== -1) {
      this.games.splice(index, 1);
      this.updateDisplayedGames();
    }
  }

  editGame(game: Game) {
    const newName = prompt('Enter the new name:', game.title);
    if (newName && newName.trim() !== '') {
      game.title = newName.trim();
      this.updateDisplayedGames();
    }
  }
}
