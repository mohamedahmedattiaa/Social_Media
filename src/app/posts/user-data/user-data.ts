import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-data',
  standalone: false,
  templateUrl: './user-data.html',
  styleUrls: ['./user-data.css'],
})
export class UserData {
  @Input() username!: string;
  @Input() userImage!: string;
  @Input() createdAt?: string | Date;
}
