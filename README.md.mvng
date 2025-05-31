# old-repositories-projects
unification of repositories into a single repository



## Commands used to transfer repositories to this single repository

The file `../repo-name-to-unify.txt` has all repositories I wanted to move to this repository.

Command used to transfer history of other repositories to this project, except react-configured-lint-tests:

```sh
cat ../repo-name-to-unify.txt | grep 'react-configured-lint-tests' | xargs -E"\n" -I{} bash -c 'REPO_NAME=$(echo "{}" | sed -E "s/\|.+\$//g") && DEFAULT_BRANCH_NAME=$(echo "{}" | sed -E "s/^.+\|//g") && echo "REPO_NAME=$REPO_NAME" && echo "DEFAULT_BRANCH_NAME=$DEFAULT_BRANCH_NAME" && (git remote remove "$REPO_NAME" &>/dev/null || echo -n "") && git remote add "$REPO_NAME" "git@github.com:pethersonmoreno/$REPO_NAME.git" && git fetch -q "$REPO_NAME" "$DEFAULT_BRANCH_NAME" && git checkout -q b57f52fe9d && git checkout -q -b "$REPO_NAME" && git merge -q --allow-unrelated-histories "$REPO_NAME/$DEFAULT_BRANCH_NAME" && rm -rf "$REPO_NAME" && mkdir "$REPO_NAME/" && git mv -k * "$REPO_NAME/" && while [ $(ls -a | grep -E "^\." | grep -v -E "^(\.|\.\.|\.git)$" | wc -l) -gt 0 ]; do git mv "$(ls -a | grep -E "^\." | grep -v -E "^(\.|\.\.|\.git)$" | head -n 1)" "$REPO_NAME/"; done && git commit -q -m "Added history of repository pethersonmoreno/$REPO_NAME to dir $REPO_NAME/" && git checkout -q main && git merge -q --allow-unrelated-histories "$REPO_NAME" && git branch -D "$REPO_NAME" && git remote remove "$REPO_NAME"'
```

To repository 'react-configured-lint-tests', it needed a special run using git cherry-pick of each commit and move it to a subdirectory.