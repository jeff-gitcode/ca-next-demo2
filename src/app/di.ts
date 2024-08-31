import { Container } from "inversify";

import { infrastrcutrueModule } from "./infrastrcutrue/di";
import { applicationModule } from "./application/di";

const AppplicationContainer = new Container();

AppplicationContainer.load(infrastrcutrueModule);
AppplicationContainer.load(applicationModule);
