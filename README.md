# faml
A CLI tool to fill yaml placeholder

## Install
```sh
npm i -g @appveen/faml
```
## Running Options
### Run for single file
```sh
faml -f <filename>
```

### Run for multiple files in a directory
```sh
faml -d <directory>
```

### Change placeholder prefix
```sh
faml -p <prefix>
#default prefix __ (underscore twice)
```

### Change placeholder suffix
```sh
faml -s <suffix>
#default suffix __ (underscore twice)
```
## Examples

### Example 1
```sh
faml -f test_app.yaml
# This will look for file in the current working directory
```
### Example 2
```sh
faml -f ../test_app.yaml
# This will look for file in the parent directory of the current working directory
```

### Example 3
```sh
faml -f /usr/ubuntu/test_app.yaml
# This will look for file in the given path
```

### Example 4
```sh
faml -f test_app.yaml -p $$ -s $$
# This will look for all placeholders in file with $$ as prefix and suffix
```