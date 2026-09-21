import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CimsService } from '../../services/cims.service';
import { CimsAllTicketsComponent } from './cims-all-tickets.component';

describe('CimsAllTicketsComponent', () => {
  let component: CimsAllTicketsComponent;
  let fixture: ComponentFixture<CimsAllTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CimsAllTicketsComponent],
      providers: [
        {
          provide: CimsService,
          useValue: {
            getIncidentTypes: () => of([]),
            getAllTickets: () => of({ content: [] })
          }
        },
        {
          provide: MatSnackBar,
          useValue: { open: () => {} }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CimsAllTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should normalize field person names with underscores and mixed casing', () => {
    expect((component as any).toTitleCase('imtiyaz_field_person')).toBe('Imtiyaz Field Person');
    expect((component as any).toTitleCase('Imtiyaz_Field Person')).toBe('Imtiyaz Field Person');
  });
});
