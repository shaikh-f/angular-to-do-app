import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppLayoutComponent } from "./app.layout.component";

@NgModule({
    declarations: [
        AppTopBarComponent,
        AppFooterComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RippleModule,
        RouterModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
