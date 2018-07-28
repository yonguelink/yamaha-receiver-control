# Generic Node project boilerplate

Boilerplate that lets you setup a node project quickly.

## Using this boilerplate

### Create a new project

1.  Open gitlab and create a new project
1.  Give it a description and avatar in _General project settings_
1.  Disable un-needed features in _Permissions_
1.  Only allow MRs to be merged if the build succeeds and the discussions are
    resolved in _Merge request settings_
1.  Create a local git repository for your project

    ```sh
    mkdir my-project
    cd my-project
    git init
    git commit --allow-empty -m 'Empty project'
    git remote add origin {ssh url of your project}
    git push -u origin master
    ```

### Synchronize with boilerplate project

1.  Fetch boilerplate

    ```sh
    git remote add boilerplate ssh://git@repo.pmcti.re:2022/boilerplate/node.git
    git fetch boilerplate
    ```

1.  Merge boilerplate into your project

    ```sh
    git checkout -b boilerplate-sync
    git merge --allow-unrelated-histories boilerplate/master
    ```

1.  Find and resolve all TODOs

    ```sh
    git grep -i todo
    ```

1.  Install latest node dependencies

    ```sh
    yarn upgrade --latest
    ```

1.  Make sure that you can run and test the project

    ```sh
    yarn test
    # all tests should be green

    yarn lint
    # you should not have lint issues
    ```

1.  Commit and push your changes

    ```sh
    git add {...}
    git commit
    git push -u origin boilerplate-sync
    ```

### Merge boilerplate sync with master

1.  Create a merge request for your `boilerplate-sync` branch
1.  Have someone review it
1.  Merge that into master

<!-- TODO: Delete everything above this line -->

# TODO: title

TODO: add description

## Usage

TODO: how do I use this?

## Development

### Setup

```sh
yarn
```

### Running

TODO: how do you run this?

### Tests

Run once:

```sh
yarn test
```

Watch:

```sh
yarn test --watch
```

### Lint

```sh
yarn lint
```

## Release

1.  Checkout master
1.  Bump a new version

    ```sh
    yarn version
    ```

1.  Push your new tag

    ```sh
    git push --tags origin master
    ```
