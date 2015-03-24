CREATE TABLE person(
    personId INT NOT NULL AUTO_INCREMENT,
    person_firstName VARCHAR(100),
    person_lastName VARCHAR(100),
    person_message TEXT,
    PRIMARY KEY (personId)
);

create table pet(
    petId int not null auto_increment,
    pet_personId int not null,
    pet_firstName varchar(100),
    pet_lastName varchar(100),
    pet_nickName varchar(100),
    pet_type varchar(100),
    foreign key (pet_personId) references person(personId),
    primary key (petId)
);