import {Component, OnInit} from '@angular/core';
import {Padlet} from "../interfaces/padlet";
import {User} from "../interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletService} from "../services/padlet.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../services/auth.service";
import {Entry} from "../interfaces/entry";
import {NewEntryComponent} from "../new-entry/new-entry.component";
import {NewRatingComponent} from "../new-rating/new-rating.component";
import {Rating} from "../interfaces/rating";
import {NewCommentComponent} from "../new-comment/new-comment.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {UpdateEntryComponent} from "../update-entry/update-entry.component";

@Component({
  selector: 'app-padlet-detail-view-only',
  templateUrl: './padlet-detail-view-only.component.html',
  styleUrls: ['./padlet-detail-view-only.component.scss']
})
export class PadletDetailViewOnlyComponent implements OnInit{
  padlet!: Padlet;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private padletService: PadletService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.loadData();
    const userId = this.authService.getUsername();
    this.authService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id != null) {
      this.padletService.getPadlet(id).subscribe(padlet => {
        this.padlet = padlet;
        this.loadEntries(this.padlet);
      });
    }
  }

  loadEntries(padlet: Padlet) {
    this.padletService.getEntries(padlet.id)
      .subscribe(entries => {
        this.padlet.entries = Object.values(entries);
        this.padlet.entries.forEach(entry => {
          this.loadComments(entry);
          this.loadRatings(entry); // Neu hinzugefügt
        });
        console.log(entries);
      });

  }

  loadComments(entry: Entry) {
    this.padletService.getComments(entry.id)
      .subscribe(comments => {
        entry.comments = comments;
      });
  }

  loadRatings(entry: Entry) {
    this.padletService.getRatings(entry.id)
      .subscribe(ratings => entry.ratings = ratings);
  }

  averageRating(entry: Entry): number {
    if (!entry.ratings || entry.ratings.length === 0) {
      return 0;
    }

    const sum = entry.ratings.reduce((a, b) => a + b.rating, 0);
    return sum / entry.ratings.length;
  }

  openNewEntryDialog(): void {
    const dialogRef = this.dialog.open(NewEntryComponent, {
      data: { padletId: this.padlet.id, user: this.user  }
    });

    dialogRef.afterClosed().subscribe((entry: Entry) => {
      if (entry) {
        if (this.padlet.entries) {
          this.padlet.entries.push(entry);
        } else {
          this.padlet.entries = [entry];
        }
      }
    });
  }

  openNewRatingDialog(entry: Entry): void {
    const dialogRef = this.dialog.open(NewRatingComponent, {
      data: { entryId: entry.id }
    });

    dialogRef.afterClosed().subscribe((rating: Rating) => {
      if (rating) {
        if (entry.ratings) {
          entry.ratings.push(rating);
        } else {
          entry.ratings = [rating];
        }
      }
    });
  }

  openNewCommentDialog(entry: Entry): void {
    const dialogRef = this.dialog.open(NewCommentComponent, {
      data: { entryId: entry.id, user: this.user }
    });

    dialogRef.afterClosed().subscribe((comment: Comment) => {
      if (comment) {
        if (entry.comments) {
          entry.comments.push(comment);
        } else {
          entry.comments = [comment];
        }
      }
    });
  }

  deleteEntry(entryId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.padletService.deleteEntry(this.padlet.id, entryId).subscribe(() => {
          if (this.padlet.entries) {
            this.padlet.entries = this.padlet.entries.filter(entry => entry.id !== entryId);
          }
        });
      }
    });
  }

  deletePadlet() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.padletService.deletePadlet(this.padlet.id).subscribe(() => {
          // navigate back to the list of padlets
          this.router.navigate(['/padlets']);
        });
      }
    });
  }

  deleteComment(commentId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.padletService.deleteComment(commentId).subscribe(() => {
          if (this.padlet.entries) {
            this.padlet.entries.forEach(entry => {
              if (entry.comments) {
                entry.comments = entry.comments.filter(comment => comment.id !== commentId);
              }
            });
          }
        });
      }
    });
  }

  openUpdateEntryDialog(entry: Entry): void {
    const dialogRef = this.dialog.open(UpdateEntryComponent, {
      data: { entry: entry }
    });

    dialogRef.afterClosed().subscribe((updatedEntry: Entry) => {
      if (updatedEntry) {
        if (this.padlet.entries) {
          const index = this.padlet.entries.findIndex(e => e.id === updatedEntry.id);
          if (index !== -1) {
            this.padlet.entries[index] = updatedEntry;
          }
        }
        this.loadData();
      }
    });
  }

  logout(){
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
