import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { DataSource, REST_URL } from "./db.service";
import { Model } from "./repository.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [Model, DataSource, {
        provide: REST_URL, useValue: `http://${location.hostname}:3500/employee`
    }]
})
export class ModelModule { }
