/**
 * Created by agreen on 3/20/15.
 */

$(function() {
    new AppRouter();

    Backbone.history.start();
    console.log('calling app router');
});