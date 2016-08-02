;(function(){

  var _idCounter = 001;

  function assignId(){
    var id = _idCounter;
    _idCounter++;
    return id;
  }

  module.exports = assignId


}());