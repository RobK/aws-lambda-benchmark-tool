# Required Config - Change this to a bucket that you have put & get access to.
BUCKET_NAME=robert-kehoe-benchmark-tool


# Optionally change the Cloudformation stack name
STACK_NAME=kehoro-test

deploy:
	@aws cloudformation package \
	--template-file stack.yaml \
	--output-template-file serverless-output.yaml \
	--s3-bucket "$(BUCKET_NAME)"

	@aws cloudformation deploy --template-file serverless-output.yaml \
	--stack-name $(STACK_NAME) \
	--capabilities CAPABILITY_IAM