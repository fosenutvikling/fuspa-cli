# fuspa-cli
Command line utility that creates a project structure for a Single-Page-Application. 

fuspa-cli is meant to help you create your next spa with ease! The created project structure is relying on [fuspa](https://github.com/fosenutvikling/fuspa) to handle the spa-functionality, like dynamic rendering. For further documentation, see [fuspa](https://github.com/fosenutvikling/fuspa) repository.
## Usage

Install the package globally:

```sh
npm install fuspa-cli -g
```

Navigate to your desired folder, then create a new fuspa-project by running:

```sh
fuspa
```

See below for available options

### CLI options

The following command line flags can configure 

This generator can also be further configured with the following command line flags.

```sh
Optons:

    -V, --version               output the version number
    -N, --name [name]           Name of project (default: fuspa-starter)
    -f, --file [path]           Config file to use rather than cli-flags (default: fuspa.options.js)
    -e --engine [engine]        Set render engine (default: handlebars)
    -c --container [container]  DOM-id of element to append rendered html (default: container)
    -m --main [main]            Entry point of application (default: main.ts)
    -h, --help                  output usage information
```


- `--name` dictates the folder in which the new fuspa-project will be created.
- `--file` If a configuration file should be used rather than using command line flags
- `--engine` render-engine to use. The default, and currently only render-engine supported at the moment is [handlebars](https://github.com/wycats/handlebars.js/)
- `--container` A reference to a `HTMLElement` id (e.g. `<div id="container"/>`)
- `--main` The filename of your desired entry-point file. 


### Configuration file
Use the current configuration file:

_fuspa.options.js_:
```sh
module.exports = {
    name: 'fuspa-starter',
    engine: 'handlebars',
    container: 'container',
    main: 'main.ts'
}
```

The equivalent cli-command:

```sh
fuspa --name fuspa-starter --engine handlebars --container container --main main.ts
```



## Project structure:

```
fuspa-starter
  -- src
    -- app
      -- hbsHelpers.ts
      -- main.ts  
    -- styles
      -- main.scss
    -- views
      -- assemble
        -- <assemble related files>
      -- <render-engine folders>
  -- static
    -- fonts
    -- images
  --tasks
    -- <list of tasks>
  tsconfig.json
  package.json
```

The structure is meant to quickly get you started creating your own Single-Page-Application. The structure, tasks and configurations can be tweaked and extended, to make it fit your needs and requirements. 

The default project show how to get started using [fuspa](https://github.com/fosenutvikling/fuspa).

## API

Instead of installing `fuspa-cli` globally, an api is also provided.

`npm install fuspa-cli --save-dev`

Example usage:
```js
import {SpaProject} from 'fuspa-cli';

const project = new SpaProject({
    engine: 'handlebars',
    container: 'container',
    name: 'fuspa-starter',
    mainFile: 'main.ts'
});

project.create();
```