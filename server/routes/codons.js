var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    path = '/Users/ibrahimhawari/Documents/codons';
    var files = req.body.map(x => path + '/' + x.file);
    var starts = req.body.map(x => x.start);

    var PythonShell = require('python-shell');

    var options = {
        scriptPath: path,
        args: files.reduce((arr, v, i) => {return arr.concat(v, starts[i])}, [])
    }

    PythonShell.run('codons.py', options, (err, results) => {
        if (err) throw err;
        var result = results[0].replace(/'/g, '"');
        res.status(200).send(JSON.parse(result));
    })
});

module.exports = router;