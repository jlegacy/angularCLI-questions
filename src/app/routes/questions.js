var express = require('express');
var async = require('async');

var app = express();

var bodyParser = require('body-parser');

var json_body_parser = bodyParser.json();

var urlencoded_body_parser = bodyParser.urlencoded({ extended: true });
app.use(json_body_parser);
app.use(urlencoded_body_parser);

var router = express.Router();

var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var Q = require('q');
var db = monk(config.connectionString);

var questionsDb = db.get('questions');
var testsDb = db.get('tests');

router.get('/', function (req, res, next) {
    getAllQuestions()
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err); 
        });
})

router.get('/questionsOnReport', function (req, res, next) {
    getQuestionsOnReport()
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})

router.get('/testResults', function (req, res, next) {
    getTestResults()
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})

router.post('/', json_body_parser, function (req, res) {
    postQuestion(req.body)
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})



router.post('/postTest', json_body_parser, function (req, res) {
    postTest(req.body)
        .then(function (result) {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})

router.post('/searchQuestions', json_body_parser, function (req, res) {
    searchQuestions(req.body)
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})

router.get('/:_id', function (req, res, next) {
    getAllQuestion(req.params._id)
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})

router.delete('/:_id', function (req, res, next) {
    deleteQuestion(req.params._id)
        .then(function (result) {            
            if (result.result.ok === 1) {
                res.send({ msg: 'Deleted' });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})

router.put('/:_id', json_body_parser, function (req, res, next) {
    putQuestion(req.params._id, req.body)
        .then(function (result) {
            if (result.ok === 1) {
                res.send({ msg: 'Updated' });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})

router.post('/updateOnTest', json_body_parser, function (req, res) {
    updateOnTest(req.body)
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
})

function getAllQuestions() {
    var time = new Date().getTime();
    var deferred = Q.defer();
    questionsDb.find({}, function (err, questions) {
        if (err) deferred.reject(err);
        if (questions) {

            deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getQuestionsOnReport() {
    var time = new Date().getTime();
    var deferred = Q.defer();
    questionsDb.find({ 'ontest': "true" }, function (err, questions) {
        if (err) deferred.reject(err);
        if (questions) {

            deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getTestResults() {
    var time = new Date().getTime();
    var deferred = Q.defer();
    testsDb.find({}, function (err, questions) {
        if (err) deferred.reject(err);
        if (questions) {
            deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function postQuestion(data) {
    var time = new Date().getTime();
    var deferred = Q.defer();
    questionsDb.insert(data, function (err, questions) {
        if (err) deferred.reject(err);
        if (questions) {

            deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function searchQuestions(search) {
    var time = new Date().getTime();
    var deferred = Q.defer();
    questionsDb.find({ 'question': new RegExp(search.input, 'i') }, function (err, questions) {
        if (err) deferred.reject(err);
        if (questions) {
            deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function postTest(data) {
    var time = new Date().getTime();
    var deferred = Q.defer();
    testsDb.insert(data, function (err, results) {
        if (err) deferred.reject(err);
        if (results) {
            deferred.resolve(results);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function searchQuestions(search) {
    var time = new Date().getTime();
    var deferred = Q.defer();
    questionsDb.find({ 'question': new RegExp(search.input, 'i') }, function (err, questions) {
        if (err) deferred.reject(err);
        if (questions) {
            deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function putQuestion(id, data) {
    var time = new Date().getTime();
    var deferred = Q.defer();
    questionsDb.update({ "_id": id }, data, function (err, result) {
        if (err) deferred.reject(err);
        if (result) {
            deferred.resolve(result);
        } else {
            // user not found
            deferred.resolve();
        }
    });



    return deferred.promise;
}


function getAllQuestion(id) {
    var time = new Date().getTime();
    var deferred = Q.defer();
    questionsDb.find({ "_id": id }, function (err, questions) {
        if (err) deferred.reject(err);
        if (questions) {

            deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function deleteQuestion(id) {
    var time = new Date().getTime();
    var deferred = Q.defer();
    questionsDb.remove({ "_id": id }, function (err, result) {
        if (err) deferred.reject(err);
        if (result) {
            deferred.resolve(result);
        } else {
            // user not found
            deferred.reject();
        }
    });

    return deferred.promise;
}

function updateOnTest(data) {
    var time = new Date().getTime();
    var deferred = Q.defer();
    var count = 0;

    for (var x in data) {
       
        questionsDb.update({ "_id": data[x]._id }, { "$set": { "ontest": "true" } }, function (err, result) {
            if (err) {
                deferred.reject(err)
            };
            if (result) {
                count = count + 1;
                if (count === data.length) {
                    deferred.resolve({ "status": "success" });
                }
            }
        });

    }

    return deferred.promise;
}

module.exports = router;