var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {

  if (err) {
    // exit
    console.log(err);
  }

  var parser = require('./syntax');
  var sTree = parser.parse(data);
  var semErrors = require('./semantic_analyzer').getSemanticErrors(sTree);
  var code = require('./code_generator').generateCodeForList(sTree);
  console.log(code);
});
