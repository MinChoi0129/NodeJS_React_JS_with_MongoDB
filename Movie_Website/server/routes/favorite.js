const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: info.length })
            console.log(`영화 '${req.body.movieId}'의 "Number of Like"을(를) 조회했습니다.`)
        })
})

router.post('/favorited', (req, res) => {
    Favorite.find({
        "movieId": req.body.movieId,
        "userFrom": req.body.userFrom
    })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            let result = false
            if (info.length !== 0) {
                result = true
            }
            res.status(200).json({ success: true, favorited: result })
            console.log(`영화 '${req.body.movieId}'의 "Pressed Like or Not"을(를) 조회했습니다.`)
        })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
            console.log(`유저 '${req.body.userFrom}'이(가) 영화 '${req.body.movieId}'의 "Like"을(를) 취소했습니다.`)
        })
})

router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        console.log(`유저 '${req.body.userFrom}'이(가) 영화 '${req.body.movieId}'의 "Like"을(를) 추가했습니다.`)
        return res.status(200).json({ success: true })
    })
})

router.post('/getFavoriteMovie', (req, res) => {
    Favorite.find({ userFrom: req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            console.log(`유저 '${req.body.userFrom}'이(가) '본인'의 "Liked Movies"을(를) 조회했습니다.`)
            return res.status(200).json({ success: true, favorites })
        })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(400).send(err)
            console.log(`유저 '${req.body.userFrom}'이(가) 영화 '${req.body.movieId}'를 '본인'의 "Liked Movies"에서 제거했습니다.`)
            return res.status(200).json({ success: true })
        })
})

module.exports = router;