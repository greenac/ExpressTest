/**
 * Created by agreen on 3/20/15.
 */

/**
 * Models
 */
var Person = Backbone.Model.extend({
    idAttribute: 'personId'
});

var PersonWithPet = Backbone.Model.extend({
    idAttribute: 'petId'
});

/**
 * Collections
 */
var PersonCollection = Backbone.Collection.extend({
    model       : Person,
    url         : '/get-people'
});

var PersonAndPetCollection = Backbone.Collection.extend({
    model       : PersonWithPet,
    url         : '/get-people-with-pets'
});

/**
 * views
 */
var PersonView = Backbone.View.extend({
    tagName: "li",
    className: "person",
    render: function () {
        var template = $("#person-template").html();
        var compiled = Handlebars.compile(template);
        var html = compiled(this.model.attributes);
        this.$el.html(html);
        return this;
    }
});

var PersonAndPetView = Backbone.View.extend({
    tagName: 'li',
    className: 'personWithPet',
    render: function () {
        var template = $("#personAndPets-template").html();
        var compiled = Handlebars.compile(template);
        var html = compiled(this.model.attributes);
        this.$el.html(html);
        return this;
    }
});

/**
 * Collection Views
 */
var PersonCollectionView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
    },
    tagName: 'ul',
    className: 'people',
    render: function () {
        this.$el.html('');
        this.collection.each(function(person) {
            var personView = new PersonView({model: person});
            this.$el.append(personView.render().el);
        }, this);
        return this;
    }
});

var PersonAndPetCollectionView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
    },
    tagName: 'ul',
    className: 'peopleAndPets',
    render: function() {
        this.$el.html('');
        this.collection.each(function(personAndPet) {
            var personAndPetView = new PersonAndPetView({model: personAndPet});
            this.$el.append(personAndPetView.render().el);
        }, this);
        return this;
    }
});
/**
 * Router
 */
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'index'
    },

    initialize: function() {
        console.log('app router started');
    },

    index: function() {

        var personData = JSON.parse($("#initialPeopleData").html());
        var personCollection = new PersonCollection(personData);
        var personView = new PersonCollectionView({collection: personCollection});
        $("#people").html(personView.render().el);

        var personAndPetData = JSON.parse($("#initialPeopleAndPetsData").html());
        var personAndPetCollection = new PersonAndPetCollection(personAndPetData);
        var personAndPetCollectionView = new PersonAndPetCollectionView({
            collection: personAndPetCollection
        });
        $("#peopleAndPets").html(personAndPetCollectionView.render().el);
    }
});