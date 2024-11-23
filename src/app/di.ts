import { Container } from 'inversify';

import { infrastructrueModule } from './infrastrcutrue/di';
import { applicationModule } from './application/di';

const ApplicationContainer = new Container();

ApplicationContainer.load(infrastructrueModule);
ApplicationContainer.load(applicationModule);

export { ApplicationContainer };
