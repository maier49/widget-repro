import renderer from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { w } from '@dojo/framework/core/vdom';
import { registerThemeInjector } from '@dojo/framework/core/mixins/Themed';
import dojo from '@dojo/themes/dojo';
import '@dojo/themes/dojo/index.css';

import App from './App';

const registry = new Registry();
registerThemeInjector(dojo, registry);

const r = renderer(() => w(App, {}));
r.mount({ registry });
