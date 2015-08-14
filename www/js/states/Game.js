var HachiBowl = HachiBowl || {};

//title screen
HachiBowl.Game = function(){};

HachiBowl.Game.prototype = {
  preload: function() {},
  
  create: function() {
    var ball = this.game.add.sprite(300, 300, 'ball1');
    this.game.stage.backgroundColor = '#000';

    //  Input Enable the sprites
    ball.inputEnabled = true;
    ball.input.allowVerticalDrag = false;

    //  Allow dragging - the 'true' parameter will make the sprite snap to the center
    ball.input.enableDrag(false);
  },
  
  update: function() {
    
  },
  
  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function(key){
      sprite[key] = element.properties[key];
    });
  },
  
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
};