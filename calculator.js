const express = require('express');
const math = require('mathjs');
const ExpressError = require('./expressError.js');

const app = express();

app.get('/mean', (req, res, next) => {
    try {
        if (!req.query.nums) {throw new ExpressError(`nums are required`, 400)};
        let numsString = req.query.nums.split(',');
        numsString.every((val) => {
            if (Number.isNaN(Number(val))) {throw new ExpressError(`${val} is not a number.`, 400)};
            return true
        })
        mean = math.mean(numsString);

        const result = {
            operation: 'mean',
            value: mean
        }
        res.send(result)

    } catch (e) {
        next(e)
    }
})

app.get('/median', (req, res, next) => {
    try {
        let numsString = req.query.nums.split(',');
        numsString.every((val) => {
            if (Number.isNaN(Number(val))) {throw new ExpressError(`${val} is not a number.`, 400)};
            return true
        })
        median = math.median(numsString);

        const result = {
            operation: 'median',
            value: median
        }
        res.send(result)

    } catch (e) {
        next(e)
    }
})

app.get('/mode', (req, res, next) => {
    try {
        let numsString = req.query.nums.split(',');
        let nums = numsString.map((val) => {
            if (Number.isNaN(Number(val))) {throw new ExpressError(`${val} is not a number.`, 400)};
            return Number(val)
        })
        mode = math.mode(nums);

        const result = {
            operation: 'mode',
            value: mode
        }
        res.send(result)

    } catch (e) {
        next(e)
    }
})

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

app.use((err, req, res, next) => {
    let status = err.status || 500; // defaults to 500
    let msg = err.msg;

    return res.status(status).json({
        error: {msg, status}
    })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})