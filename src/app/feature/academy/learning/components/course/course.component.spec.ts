import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CourseComponent } from './course.component';
import { LearningService } from '../../shared/services/learning.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let activatedRouteMock: any;
  let learningServiceMock: any;
  let sanitizerMock: any;
  let spinnerServiceMock: any;

  beforeEach(async () => {
    activatedRouteMock = {
      paramMap: of({
        get: (param: string) => {
          if (param === 'id') return '1';
          if (param === 'parentId') return '2';
          if (param === 'queryParams') return 'test';
        }
      })
    };

    learningServiceMock = jasmine.createSpyObj('LearningService', ['getSubTopic', 'getTopic']);
    sanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    spinnerServiceMock = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      declarations: [ CourseComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: LearningService, useValue: learningServiceMock },
        { provide: DomSanitizer, useValue: sanitizerMock },
        { provide: NgxSpinnerService, useValue: spinnerServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getParameters on ngOnInit', () => {
    const getParametersSpy = spyOn(component as any, 'getParameters').and.callThrough();
    component.ngOnInit();
    expect(getParametersSpy).toHaveBeenCalled();
  });

  it('should call getSubtopic and getTopic on getParameters', () => {
    const getSubtopicSpy = spyOn(component as any, 'getSubtopic').and.callThrough();
    const getTopicSpy = spyOn(component as any, 'getTopic').and.callThrough();
    (component as any).getParameters(); // Accedemos a los métodos privados a través de 'component' como any
    expect(getSubtopicSpy).toHaveBeenCalled();
    expect(getTopicSpy).toHaveBeenCalled();
  });

  it('should set loading to false after hiden method is called', () => {
    component.hiden();
    expect(component.loading).toBeFalse();
  });


});
