db.createUser(
    {
        user: 'pokemon',
        pwd: 'trainer',
        roles: [
            {
                role: "readWrite",
                db: "pokemontrainer"
            }
        ]
    }
);