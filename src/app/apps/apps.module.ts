import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// shared module
import { SharedModule } from 'src/shared.module';

import { ChatComponent } from './chat';
import { CRMComponent } from './crm.component';
import { HistoryTabsComponent } from './history-tabs/history-tabs.component';
import {  HistoryTablesComponent } from './history-tables/history-tables.component';
import { QuestionsTableComponent } from './questions-table/questions-table.component';

const routes: Routes = [
    { path: 'apps/chat', component: ChatComponent, data: { title: 'Chat' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule.forRoot(), DatePipe ],
    declarations: [
        ChatComponent,
        CRMComponent,
        HistoryTabsComponent,
        HistoryTablesComponent,
        QuestionsTableComponent
    ],
})
export class AppsModule {}
