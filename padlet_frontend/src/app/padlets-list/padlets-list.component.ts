import {Component, OnInit} from '@angular/core';
import { Padlet } from '../interfaces/padlet';
import {PadletService} from "../services/padlet.service";
import {MatDialog} from "@angular/material/dialog";
import {NewPadletComponent} from "../new-padlet/new-padlet.component";
import {NewEntryComponent} from "../new-entry/new-entry.component";
import {Entry} from "../interfaces/entry";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {AuthService} from "../services/auth.service";
import {User} from "../interfaces/user";
import {InviteComponent} from "../invite/invite.component";


@Component({
  selector: 'app-padlets-list',
  templateUrl: './padlets-list.component.html',
  styleUrls: ['./padlets-list.component.scss']
})
export class PadletsListComponent implements OnInit {

  publicPadlets: Padlet[] = [];
  privatePadlets: Padlet[] = [];
  sharedPadlets: Padlet[] = [];
  user!: User;

  constructor(private padletService: PadletService,
              private dialog: MatDialog,
              private authService: AuthService) {}

  ngOnInit() {
    const userId = this.authService.getUsername();
    this.authService.getUser(userId).subscribe(user => {
      this.user = user;
      this.padletService.getSharedPadlets(this.user.id).subscribe((padlets)=>{
        this.sharedPadlets = padlets
        padlets.forEach(padlet => this.loadEntries(padlet));
      });
    });
    this.padletService.getPublicPadlets().subscribe((padlets)=>{
      this.publicPadlets = padlets
      padlets.forEach(padlet => this.loadEntries(padlet));
    });
    this.padletService.getPrivatePadlets().subscribe((padlets)=>{
      this.privatePadlets = padlets
      padlets.forEach(padlet => this.loadEntries(padlet));
    });


  }

  loadEntries(padlet: Padlet) {
    this.padletService.getEntries(padlet.id)
      .subscribe(entries => padlet.entries = Object.values(entries));
  }

  openNewPadletDialog(): void {
    const dialogRef = this.dialog.open(NewPadletComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createPadlet(result);
      }
    });
  }

  createPadlet(newPadlet: Padlet): void {
    newPadlet.id = 'default';
    newPadlet.creator = this.user.name;
    // Check for each animal and set the image URL accordingly
    newPadlet.url = newPadlet.animal + ".png";

    this.padletService.createPadlet(newPadlet).subscribe((padlet) => {
      if (padlet.private == true){
        this.privatePadlets.push(padlet);
      }else {
        this.publicPadlets.push(padlet);
      }

    });
  }

  openNewEntryDialog(padlet: Padlet): void {
    const dialogRef = this.dialog.open(NewEntryComponent, {
      data: { padletId: padlet.id, user: this.user}
    });

    dialogRef.afterClosed().subscribe((entry: Entry) => {
      if (entry) {
        if (padlet.entries) {
          padlet.entries.push(entry);
        } else {
          padlet.entries = [entry];
        }
      }
    });
  }

  deleteEntry(padletId: string, entryId: string, isPrivate:boolean) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.padletService.deleteEntry(padletId, entryId).subscribe(() => {
          if (isPrivate) {
            this.privatePadlets = this.privatePadlets.map(padlet => {
              if (padlet.id === padletId) {
                if (padlet.entries) {
                  padlet.entries = padlet.entries.filter(entry => entry.id !== entryId);
                }
              }
              return padlet;
            });
          } else {
            this.publicPadlets = this.publicPadlets.map(padlet => {
              if (padlet.id === padletId) {
                if (padlet.entries) {
                  padlet.entries = padlet.entries.filter(entry => entry.id !== entryId);
                }
              }
              return padlet;
            });
          }
        });
      }
    });
  }

  deletePadlet(padletId: string, isPrivate:boolean) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.padletService.deletePadlet(padletId).subscribe(() => {
          if (isPrivate) {
            this.privatePadlets = this.privatePadlets.filter(padlet => padlet.id !== padletId);
          } else {
            this.publicPadlets = this.publicPadlets.filter(padlet => padlet.id !== padletId);
          }

        });
      }
    });
  }

  openInviteDialog(padletId: string): void {
    const dialogRef = this.dialog.open(InviteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.padletService.sharePadletWithEmail(padletId, result).subscribe(
          response => console.log('Padlet shared'),
          error => console.error('Error sharing padlet')
        );
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
