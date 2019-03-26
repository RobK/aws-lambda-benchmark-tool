@echo off

REM Optionally change the Cloudformation stack name
set STACK_NAME=benchmark-test
IF "%1"=="deploy" (
    GOTO deploy
) ELSE IF "%1"=="zip" (
    GOTO zip
) ELSE IF "%1"=="" (
    GOTO deploy
) ELSE (
    GOTO Invalid
)

:deploy
echo Packaging and uploading...
call aws cloudformation package --template-file stack.yaml ^
    --output-template-file serverless-output.yaml ^
    --s3-bucket %BUCKET_NAME%
echo Deploying package...
REM --parameter-overrides "NotificationEmail=%NOTIFICATION_EMAIL%" "CronSchedule=%CRONSCHEDULE%"
call aws cloudformation deploy --template-file serverless-output.yaml --stack-name %STACK_NAME% --capabilities CAPABILITY_IAM
GOTO Finished

:zip
REM Assumes you have 7-Zip installed, this is for development only (Pro tip: nodemon --exec "make zip")
7z a lambda.zip nodejs610
call aws lambda update-function-code --function-name benchmark-test-NodeJs610Function-17RHREE3GP564 --zip-file fileb://./lambda.zip
del lambda.zip
GOTO Finished

GOTO Finished

:Invalid
echo Invalid command (try: make deploy)
GOTO Finished

:Finished