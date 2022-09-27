const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('genresList.ejs', {genres})
            })
    },

    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id, {
            include : [
                    {
                    assosiation: "movies"  //la assosiation la hice en movie.js, lìnea 44 //
                    }
            ]
            })  

        .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
            
    }

}

module.exports = genresController;