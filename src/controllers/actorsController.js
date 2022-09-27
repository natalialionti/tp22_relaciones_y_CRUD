const db = require('../database/models');
const sequelize = db.sequelize;


const actorsController = {
    'list': (req, res) => {
        db.Actors.findAll({
            order: ["last_name"]
        })

            .then(actors => {
                res.render('actorsList.ejs', {actors})
            })
    },     

    'detail': (req, res) => {
        db.Actor.findByPk(req.params.id, {
            include : [
                    {
                    assosiation: "movies"  //la assosiation la hice en movie.js, lìnea 44 //
                    }
            ]
            })  

        .then(genre => {
                res.render('actorsDetail.ejs', {actor});
            });
            
    }


}

module.exports = actorsController;