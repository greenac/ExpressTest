/**
 * Created by agreen on 3/20/15.
 */

/**
 * constants
 */

var AppConstants = {
    collectionViewNames: {
        person      : 'personCollectionView',
        personAndPet: 'personAndPetCollectionView'
    }
};

/**
 * Models
 */
var Person = Backbone.Model.extend({
    idAttribute: 'personId'
});

var PersonWithPet = Backbone.Model.extend({
    idAttribute: 'personId'
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
    events: {
        'click .personLink': 'showPersonsPets'
    },
    render: function () {
        return ViewCompiler.compile(this, "#person-template");
    },
    showPersonsPets: function (e) {
        e.preventDefault();
        var id = this.model.get('personId');
        router.navigate('persons-pets/' + id, {trigger: true});
    }
});

var PersonAndPetView = Backbone.View.extend({
    tagName: 'li',
    className: 'personWithPet',
    render: function () {
        return ViewCompiler.compile(this, "#personAndPets-template");
    }
});

var PersonAndPetDetailView = Backbone.View.extend({
    render: function () {
        return ViewCompiler.compile(this, "#personsPetsDetail-template");
    }
});

/**
 * View helper classes
 */

var ViewCompiler = {
    compile: function(view, tag) {
        // compile the view's template
        var compiled = Handlebars.compile($(tag).html());
        var html = compiled(view.model.attributes);
        view.$el.html(html);
        return view;
    }
};
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
    initialize: function() {
        for(var appConstName in AppConstants.collectionViewNames) {
            var appConst = AppConstants.collectionViewNames[appConstName];
            this._setupCollections(appConst);
        }
    },

    collections: {
        personCollection: undefined,
        personAndPetsCollection: undefined
    },

    routes: {
        ''                      : 'index',
        '/'                     : 'index',
        'persons-pets/:personId': 'personsPets'
    },

    _setupCollections: function (collectionName) {
        console.log('collection name', collectionName);
        switch (collectionName) {
            case AppConstants.collectionViewNames.person: {
                if(this.collections.personCollection) {
                    return this.collections.personCollection
                }

                var personData = JSON.parse($("#initialPeopleData").html());
                this.collections.personCollection = new PersonCollection(personData);
                break;
            }
            case AppConstants.collectionViewNames.personAndPet: {
                if (this.collections.personAndPetsCollection) {
                    return this.collections.personAndPetsCollection
                }

                var personAndPetData = JSON.parse($("#initialPeopleAndPetsData").html());
                this.collections.personAndPetsCollection = new PersonAndPetCollection(personAndPetData);
                break;
            }
        }

    },

    index: function() {
        var personView = new PersonCollectionView({
            collection: this.collections.personCollection
        });
        $("#people").html(personView.render().el);


        var personAndPetCollectionView = new PersonAndPetCollectionView({
            collection: this.collections.personAndPetsCollection
        });
        var divPeopleAndPets = $('div#peopleAndPets');
        divPeopleAndPets.html(personAndPetCollectionView.render().el);
    },

    personsPets: function(personId) {
        var personWithPet = this.collections.personAndPetsCollection.get(personId);
        console.log('personWithPet: ', personWithPet);
        var personAndPetDetailView = new PersonAndPetDetailView({model: personWithPet});
        $("#people").html(personAndPetDetailView.render().el);
    }
});