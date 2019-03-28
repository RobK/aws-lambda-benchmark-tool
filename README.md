# Lambda Algorithm Tester

An AWS SAM stack (implementation plus CloudFormation Deployment) that tests various Lambda runtimes in solving the Codeility "Missing Integer" problem.

Tested AWS Lambda Runtimes:
  - NodeJS 6.10
  - NodeJS 8.10
  - Python 2.7
  - Python 3.6
  - Python 3.7
  - .Net Core 1.0
  - .Net Core 2.0
  - .Net Core 2.1


 # How to run / see results

 To see the live (aggregated) benchmark results, you can navigate to: https://a111u0z5x2.execute-api.eu-west-1.amazonaws.com/Prod/results

 You can see a particular runtime result at: https://a111u0z5x2.execute-api.eu-west-1.amazonaws.com/Prod/${RUN_TIME}

 e.g. https://a111u0z5x2.execute-api.eu-west-1.amazonaws.com/Prod/python3.7


# Project Outline

Each supported runtime has it own folder with the solution and test data.
```
project
│   README.md
│   make.bat          - Windows build script
|   Makefile          - Linux build script
│
└─── results
│   │   index.js      - The lambda that collects the results of the tests
|   │   node_modules  - For easy of use modules are included, but run npm ci
│
└─── python37
│   │   app.py        - Python handler that computes the solution
...
│
└─── dotnetcore21
│   └─── src/HelloWorld/Solution.cs     - The C# solution file
│   └─── src/HelloWorld/Program.cs      - The C# handler that computes the solution
...
```

The test data was reversed engineered from Codeility comments.

# How to Install

### Prerequitests

- Have an Amzon AWS account
- AWS CLI tool installed
- Have configured the AWS CLI tool (i.e. already run `aws configure`)
- Have an Amazon S3 bucket already created (aws s3 mb s3://some-unique-bucket-name)

The installation of the AWS CLI tool is covered in great depth on the
[Installing the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) and the
[Configuring the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

## AWS Deployment

There is some OS specific stuff that will need to be done.

### Windows Users

Edit the `make.bat` file and change the bucket name vairable at the top as required

### Linux / Mac Users

Edit the `Makefile` file and change the  bucket name vairable at the top as required

You are now ready to begine the installation.

## Installation

### Windows & Linux/Mac

Installation instrutions are identical for all OS's,

- Git clone this repo or download the archive and extract
- Configure settings as described above
- Open a command line window / bash terminal
- Goto the directory where the project files are located
- run the command: `make deploy` (this is the same for both Windows and Linux users)
- For the precompiled runtime (.Net Core), you will need to build and publish any changes before running `make deploy`:
   - `cd dotnetcore21`
   - `powershell`
   - `.\build --target=Publish`
