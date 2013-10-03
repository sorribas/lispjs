all:
	jison ./lib/syntax.jison -o ./lib/syntax.js
clean:
	rm ./lib/syntax.js
	rm -rf ./lib-cov/
test:
	./node_modules/.bin/mocha
test-with-coverage:
	rm -rf lib-cov
	jscoverage lib lib-cov
	LISPJS_COV=1 ./node_modules/.bin/mocha -R html-cov > lib-cov/coverage.html
.PHONY: test
