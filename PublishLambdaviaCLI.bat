rem THIS FILE NEEDS TO BE LOCATED IN THE SAME FOLDER THAT HAS LAMBDA AND SPEECH ASSETS
rem THIS FILE WILL CREATE A LAMBDA.ZIP FILE THAT WILL BE UPLOADED TO AWS USING THE AMAZON CLI

cd /d "%~dp0lambda"
del lambda.zip
7z a lambda.zip
aws lambda update-function-code --function-name MyLambdaFunctionName --zip-file fileb://lambda.zip

