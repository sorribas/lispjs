all:
	jison ./lib/syntax.jison -o ./lib/syntax.js
clean:
	rm ./lib/syntax.js
test:
	jscoverage lib lib-cov
	mocha -R html-cov > lib-cov/coverage.html
.PHONY: test
