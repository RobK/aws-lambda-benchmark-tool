@echo off

REM Optionally change the Cloudformation stack name
set STACK_NAME=benchmark-test
set BUCKET_NAME=kehoro-tmp-scanner
IF "%1"=="deploy" (
    GOTO deploy
) ELSE IF "%1"=="zip-python27" (
    GOTO zip
) ELSE IF "%1"=="zip" (
    GOTO zip
) ELSE IF "%1"=="" (
    GOTO deploy
) ELSE (
    GOTO Invalid
)

:deploy
echo Packaging and uploading to %BUCKET_NAME%...
call aws cloudformation package --template-file stack.yaml ^
    --output-template-file serverless-output.yaml ^
    --s3-bucket %BUCKET_NAME%
echo Deploying package...
REM --parameter-overrides "NotificationEmail=%NOTIFICATION_EMAIL%" "CronSchedule=%CRONSCHEDULE%"
call aws cloudformation deploy --template-file serverless-output.yaml --stack-name %STACK_NAME% --capabilities CAPABILITY_IAM
GOTO Finished

:zip
REM Assumes you have 7-Zip installed, this is for development only (Pro tip: nodemon --exec "make zip")
REM 7z a lambda.zip nodejs610
REM call aws lambda update-function-code --function-name benchmark-test-NodeJs610Function-17RHREE3GP564 --zip-file fileb://./dotnetcore21/artifacts/BenchmarkTest.zip
call aws lambda update-function-code --function-name benchmark-test-DotNetCore21Function-H863B4F288HV --zip-file fileb://./dotnetcore21/artifacts/HelloWorld.zip
GOTO Finished

:zip-python27
REM Assumes you have 7-Zip installed, this is for development only (Pro tip: nodemon --exec "make zip")
REM 7z a lambda.zip nodejs610
REM call aws lambda update-function-code --function-name benchmark-test-NodeJs610Function-17RHREE3GP564 --zip-file fileb://./lambda.zip
cd python27
7z a lambda.zip *
cd ..
call aws lambda update-function-code --function-name benchmark-test-Python27Function-17RO64T5YALV9 --zip-file fileb://./python27/lambda.zip
del python27\lambda.zip
GOTO Finished

GOTO Finished

:Invalid
echo Invalid command (try: make deploy)
GOTO Finished

:Finished