
db.createUser({
  user : 'stop_game_db_user',
  pwd   : '123456',
  roles: [{
    role: 'readWrite',
    database: 'stop_game_db',
  }],
});
