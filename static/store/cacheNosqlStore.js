function CacheNosqlStore() {
  riot.observable(this) // Riot provides our event emitter.

  this.on('item_current_reloadCache', function(data) {
    console.log('item_current_reloadCache');
    console.log(this.genericStore);
    $.ajax({
      method: 'get',
      url: '../data/specific/reloadcache/' + this.genericStore.itemCurrent._id ,
      contentType: 'application/json',
      headers: {
        "Authorization": "JTW" + " " + localStorage.token
      },
    }).done(function(data) {
      console.log(data);
    }.bind(this));
  });

  this.on('item_current_getCache', function(data) {
    console.log('item_current_reloadCache');
    console.log(this.genericStore);
    $.ajax({
      method: 'get',
      url: '../data/specific/getCache/' + this.genericStore.itemCurrent._id,
      contentType: 'application/json',
      headers: {
        "Authorization": "JTW" + " " + localStorage.token
      },
    }).done(function(data) {
      console.log(data);
      this.trigger('item_current_getCache_done',data)
    }.bind(this));
  });
}
