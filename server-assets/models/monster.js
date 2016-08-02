; (function () {

  var getId = require('../utils/id-generator')

  let monsters = {}

  function Monster(name, type, weapon, job) {
    this.id = getId();
    this.name = name;
    this.type = type;
    this.weapon = weapon;
    this.job = job;
    this.status = 'ALIVE'
    monsters[this.id] = this;
  }

  function createMonster(name, type, weapon, job) {
    return new Monster(name, type, weapon, job);
  }

  function getMonstersByAnything(theThing) {
    var requested = {};
    for (var id in monsters) {
      var monster = monsters[id];
      for (var prop in monster) {
        var value = monster[prop];
        if (value == theThing) {
          requested[monster.id] = monster;
        }
      }
    }
    return requested;
  }

  function getMonster(id) {
    return monsters[id];
  }

  function editMonster(id, details) {
    var monster = getMonster(id);
    if (monster) {
      for (var prop in details) {
        switch (prop) {
          case 'job':
          case 'weapon':
          case 'status':
            monster[prop] = details[prop];
            break;
        }
      }
    }
  }

  function removeMonster(id) {
    delete monsters[id];
  }

  function getAllMonsters() {
    return monsters;
  }

  module.exports = {
    getAll: getAllMonsters,
    getByValue: getMonstersByAnything,
    edit: editMonster,
    remove: removeMonster,
    get: getMonster,
    create: createMonster
  }

} ());