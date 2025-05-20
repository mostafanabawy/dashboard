import { ChangeDetectorRef, Component, effect, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HistoryService } from 'src/app/service/history.service';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html'
})
export class QuestionsTableComponent {
  constructor(
    private tabsHisoryService: HistoryService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.initForm();
    effect(() => {
      console.log('Current page changed:', this.currentPage());
    });
  }



  ngOnInit() {
    this.tabsHisoryService.fetchQuestions(1).subscribe((res: any) => {
      this.rows.set(res.result.items)
      this.totalRows.set(res.result.PagingInfo[0].TotalRows);
      this.currentPage.set(res.result.PagingInfo[0].CurrentPage);
      console.log(res);
    });
    this.translateCols();
    this.translate.onLangChange.subscribe(event => {
      console.log('Language changed to:', event.lang);
      this.translateCols();
    });
  }
  search = '';
  cols = [
    { field: 'Question', title: 'Question' },
    { field: 'AnswerEN', title: 'Answer' },
    { field: 'AnswerAR', title: 'Notes' },
    { field: 'action', title: 'Action', filter: false, headerClass: 'justify-center' }
  ];
  translateCols() {
    this.translate.get([
      'table2.Question',
      'table2.Answer',
      'table2.Notes',
      'table2.Action'
    ]).subscribe(translations => {
      this.cols = [
        { field: 'Question', title: translations['table2.Question'] },
        { field: 'AnswerEN', title: translations['table2.Answer'] },
        { field: 'AnswerAR', title: translations['table2.Notes'] },
        { field: 'action', title: translations['table2.Action'], filter: false, headerClass: 'justify-center' }
      ];
      this.cdr.detectChanges();
    });
  }

  rows = signal<any>([])
  singleRowForm!: FormGroup;
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalRows = signal<number>(0);
  initForm() {
    this.singleRowForm = this.fb.group({
      questionId: [{ value: "", disabled: true }],
      question: [''],
      answer: [''],
      notes: ['']
    });
  }


  editRow(row: any) {
    console.log(row);
    this.singleRowForm.patchValue({
      questionId: row.ID,
      question: row.Question,
      answer: row.AnswerEN,
      notes: row.AnswerAR
    });
  }
  onSubmit() {
    console.log(this.singleRowForm.value);
    this.tabsHisoryService.editRowFormData(this.singleRowForm.value).subscribe((res: any) => {
      console.log(res);
    });
  }
  onServerChange(data: any) {
    console.log(data);
    this.currentPage.set(data.current_page)
    this.tabsHisoryService.fetchQuestions(data.current_page).subscribe((res: any) => {
      this.rows.set(res.result.items)
      console.log(res);
    });
  }
}
