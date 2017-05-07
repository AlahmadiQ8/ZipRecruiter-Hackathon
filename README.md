This project was created for ZipRecruiter Hackathon 2017 and is a HR webapp to help streamline the hiring search process through facilitating easier candidate comparisons. This webapp uses the GitHub API to integrate different candidate's GitHub activity into one page.

## PREREQUISITES
*  `yarn` - a package manager
* 'mongodb' - This process should already be running with `mongod` on the CLI

## Commands

Start MongoDb with `mongod`

In development, you're going to use two commands:
Start your server with `yarn start`
Start your development environment with `yarn dev`

### Compile Only
* `yarn dev:compile` to compile JS and SCSS files

### Unit testing
* `yarn jest` to run all tests. You may optionall add a param like `yarn jest indexpage` to test files matching a regex pattern
* `yarn jest:watch` to run `jest` in watch mode
## Architecture Basics
Base.js is global JS that will be run on every page.
When creating a new page, you'll need to add a new entry to the config in `webpack.config.js`.
