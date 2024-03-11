import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <article>
    <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Фото экстерьера {{housingLocation?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">Описание жилищного пространства</h2>
      <ul>
        <li>Доступных номеров: {{housingLocation?.availableUnits}}</li>
        <li>Имеется wifi: {{housingLocation?.wifi}}</li>
        <li>Имеется ли прачечная: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Заполните анкету для получения информации</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">Фамилия</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Имя</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">E-mail</label>
        <input id="email" type="email" formControlName="email">
        <button type="submit" class="primary">Отправить заявку</button>
      </form>
    </section>
  </article>
`,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
