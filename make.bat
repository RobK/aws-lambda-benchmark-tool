@echo off


REM Required Config - Change this to a bucket that you have put & get access to.
set BUCKET_NAME=robert-kehoe-benchmark-tool


REM Optionally change the Cloudformation stack name
set STACK_NAME=benchmark-test

IF "%1"=="deploy" (
    GOTO deploy
) ELSE IF "%1"=="results" (
    GOTO results
) ELSE IF "%1"=="python27" (
    GOTO python27
) ELSE IF "%1"=="python36" (
    GOTO python36
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
call aws cloudformation deploy --template-file serverless-output.yaml --stack-name %STACK_NAME% --capabilities CAPABILITY_IAM
GOTO Finished

REM Helper function
:python27
echo "Zipping Python...."
cd python27
7z a lambda.zip *
cd ..
call aws lambda update-function-code --function-name benchmark-test-Python27Function-1AJO3MNRCCSBC --zip-file fileb://./python27/lambda.zip
del python27\lambda.zip
GOTO Finished

:python36
echo "Zipping Python...."
cd python36
7z a lambda.zip *
cd ..
call aws lambda update-function-code --function-name benchmark-test-Python36Function-M7YWCD9L8AE3 --zip-file fileb://./python36/lambda.zip
del python36\lambda.zip
GOTO Finished

:results
echo "Zipping Results App...."
7z a lambda.zip results
call aws lambda update-function-code --function-name benchmark-test-ResultsFunction-163GRIL4ZTH1F --zip-file fileb://./lambda.zip
del lambda.zip
GOTO Finished


:Invalid
echo Invalid command (try: make deploy)
GOTO Finished

:Finished