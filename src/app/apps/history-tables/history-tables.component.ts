import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HistoryService } from 'src/app/service/history.service';

@Component({
  selector: 'app-history-tables',
  templateUrl: './history-tables.component.html'
})
export class HistoryTablesComponent implements OnInit {
  constructor(
    private tabsHisoryService: HistoryService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }
  ngOnInit() {
    this.tabsHisoryService.fetchQuestions().subscribe((res: any) => {
      this.rows.set(res.result.items)
      console.log(this.rows());
    });
  }
  search = '';
  cols = [
    { field: 'Question', title: 'Question' },
    { field: 'AnswerEN', title: 'Answer' },
    { field: 'AnswerAR', title: 'Notes' },
    { field: 'action', title: 'Action', filter: false, headerClass: 'justify-center' }
  ];

  rows = signal<any>([
    {
      id: 1,
      question: 'What is the capital of France?',
      answer: 'Paris',
      notes: 'Geography question'
    },
    {
      id: 2,
      question: 'What is 2 + 2?',
      answer: '4',
      notes: 'Math question'
    }
  ])
  singleRowForm!: FormGroup;
  initForm() {
    this.singleRowForm = this.fb.group({
      questionId: [''],
      question: [''],
      answer: [''],
      notes: ['']
    });
  }


  formatDate(date: any) {
    if (date) {
      const dt = new Date(date);
      const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
      return day + '/' + month + '/' + dt.getFullYear();
    }
    return '';
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
  }
}
