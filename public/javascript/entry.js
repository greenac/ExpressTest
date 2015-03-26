/**
 * Created by agreen on 3/20/15.
 */

$(function() {
    window.router = new AppRouter();

    Backbone.history.start();
    console.log('calling app router');
});