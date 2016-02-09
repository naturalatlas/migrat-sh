# migrat-sh
[![NPM version](http://img.shields.io/npm/v/migrat-sh.svg?style=flat)](https://www.npmjs.org/package/migrat-sh)

A [Migrat](https://github.com/naturalatlas/migrat) plugin for running shell scripts as migrations.

```sh
$ npm install migrat-sh --save
```

### Configuration (`migrat.config.js`)

```js
var sh = require('migrat-sh');

module.exports = {
    plugins: [
        sh({
            interpreter: '/bin/bash',
            env: {}
        })
    ]
};
```

### Creating Migrations

```sh
$ migrat create <name> --type=sh
```

This will create a script in the migrations directory. The plugin will always execute the script with the `MIGRAT_ACTION` environment variable set to the action being performed: "up", "down", or "check". To fail, exit with a non-zero exit code – otherwise it will be assumed the script succeeded.

```sh
#!/bin/bash

if [[ "${MIGRAT_ACTION}" == "up" ]]; then
    # perform up action
elif [[ "${MIGRAT_ACTION}" == "down" ]]; then
    # perform down action
fi
```

## License

Copyright &copy; 2014–2016 [Natural Atlas, Inc.](https://github.com/naturalatlas) & [Contributors](https://github.com/naturalatlas/migrat-sh/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
