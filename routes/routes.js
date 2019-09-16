var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    // SELECT
    app.get('/endTimes/:id', (req, res) => {
        const userID = req.params.id;
        const endTime = { '_id': new ObjectID(userID) };

        db.collection('endTimes').findOne(endTime, (err, item) => {
            if (err) {
                throw err;
            } else {
                res.send(item);
            }
        })

    });

    // INSERT
    app.post('/addEndTime', (req, res) => {
        // console.log(req.body);
        const endTime = { userID: req.body.userID, endTime: req.body.endTime };

        db.collection('endTimes').insertOne(endTime, (err, result) => {
            if (err) {
                throw err;
                // res.send({'error': 'Произошла ошибка '});
            } else {
                res.send(result.ops[0]);
            }
        })
    });

};