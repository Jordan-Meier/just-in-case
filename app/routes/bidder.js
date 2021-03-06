import Ember from 'ember';

export default Ember.Route.extend({

  markers: [

  ],
  model(params) {
      return this.store.findRecord('bidder', params.bidder_id);
  },
  actions: {
    postBid(params, markerParams) {
      var marker = this.store.createRecord('marker', markerParams);
      marker.save();
      params['marker'] = marker;
      var newBid = this.store.createRecord('bid', params);
      marker['bid'] = newBid;
      console.log(marker);
      var bidder = params.bidder;
      bidder.get('bids').addObject(newBid);
      newBid.save().then(function() {
        return bidder.save();
      });

      this.transitionTo('all-bids');

    },
    createMarker(marker) {
      this.markers.push(marker);
      // console.log(this.markers);
    }
  }
});
