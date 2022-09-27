const moviesController = require("../../controllers/moviesController");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: dataTypes.BIGINT(10),
        genre_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)
    // BelongsTo sirve como si fueran las flechas que unen tablas, en este caso une pelìcula y género
    //
    Movie.assosiate = (models) => {

        Movie.belongsTo(models.Genre,
            {
                as: "genre",
                foreignKey : "genre_id"
            }
            )

        Movie.belongsToMany(models.Actor, //uso belongToMany para relacón muchos a muchos //
            {
                as: "actors", // relaciono Movie con actors//
                through: "actor_movie", // a través de la tabla actor_movie"//
                foreingKey: "movie_id", //la clave foránea viene dada por Movie y es movie_id//
                otherKey: "actor_id" //la otra clave que las vincula es actor_id//
            } 
            )     
    }

    return Movie
};