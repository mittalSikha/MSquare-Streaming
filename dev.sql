CREATE DATABASE bp;
USE bp;

DROP TABLE IF EXISTS User;
CREATE TABLE User (
  username  varchar(45) NOT NULL,
  name  varchar(45) NOT NULL,
  age  varchar(45) NOT NULL,
  password  varchar(45) NOT NULL,
  gender  varchar(16) NOT NULL,
  PRIMARY KEY (username)
);


DROP TABLE IF EXISTS Movies;

CREATE TABLE Movies (
   movie_id  varchar(64) NOT NULL,
   title  varchar(45) NOT NULL,
   genre  varchar(45) NOT NULL,
   imdb_rating  int NOT NULL,
   user_rating  double DEFAULT NULL,
  PRIMARY KEY (movie_id)
);

DROP TABLE IF EXISTS  Series ;
CREATE TABLE Series (
   series_id  varchar(64) NOT NULL,
   title  varchar(45) NOT NULL,
   genre  varchar(45) NOT NULL,
   season  int DEFAULT NULL,
   imdb_rating  int NOT NULL,
   user_rating  decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (series_id)
);


DROP TABLE IF EXISTS  Review_Movies ;
CREATE TABLE  Review_Movies  (
   revmov_id  int NOT NULL AUTO_INCREMENT,
   username  varchar(45) NOT NULL,
   movie_id  varchar(64) NOT NULL,
   rating  int DEFAULT NULL,
   review  varchar(225) DEFAULT NULL,
  PRIMARY KEY (revmov_id, username, movie_id),
  KEY  fkrmu_idx  ( username ),
  KEY  fkrmi_idx  ( movie_id ),
  CONSTRAINT  fkrmi  FOREIGN KEY ( movie_id ) REFERENCES  Movies  ( movie_id ),
  CONSTRAINT  fkrmus  FOREIGN KEY ( username ) REFERENCES  User  ( username )
);


DROP TABLE IF EXISTS  Review_Series ;
CREATE TABLE  Review_Series  (
   revser_id  int NOT NULL AUTO_INCREMENT,
   username  varchar(45) NOT NULL,
   series_id  varchar(64) NOT NULL,
   rating  int DEFAULT NULL,
   review  varchar(45) DEFAULT NULL,
  PRIMARY KEY ( revser_id , username , series_id ),
  KEY  fksrit_idx  ( series_id ),
  KEY  fksru_idx  ( username ),
  CONSTRAINT  fksrit  FOREIGN KEY ( series_id ) REFERENCES  Series  ( series_id ),
  CONSTRAINT  fksrus  FOREIGN KEY ( username ) REFERENCES  User  ( username )
);



DROP TABLE IF EXISTS  user_watchlist_movie ;

CREATE TABLE  user_watchlist_movie  (
   username  varchar(45) NOT NULL,
   movie_id  varchar(45) NOT NULL,
  PRIMARY KEY ( username , movie_id ),
  KEY  fkmi_idx  ( movie_id ),
  CONSTRAINT  fkuser  FOREIGN KEY ( username ) REFERENCES  User  ( username )
);

DROP TABLE IF EXISTS  user_watchlist_series ;
CREATE TABLE  user_watchlist_series  (
   username  varchar(45) NOT NULL,
   series_id  varchar(64) NOT NULL,
  PRIMARY KEY ( username , series_id ),
  KEY  fksi_idx  ( series_id ),
  CONSTRAINT  fkseries  FOREIGN KEY ( series_id ) REFERENCES  Series  ( series_id ),
  CONSTRAINT  fkusers  FOREIGN KEY ( username ) REFERENCES  User  ( username )
);

DROP TABLE IF EXISTS  watched_movie ;

CREATE TABLE  watched_movie  (
   username  varchar(45) NOT NULL,
   movie_id  varchar(64) NOT NULL,
   date  datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ( username , movie_id ),
  KEY  fkmuo_idx  ( movie_id ),
  CONSTRAINT  fkmau  FOREIGN KEY ( username ) REFERENCES  User  ( username ),
  CONSTRAINT  fkmuo  FOREIGN KEY ( movie_id ) REFERENCES  Movies  ( movie_id )
);

DROP TABLE IF EXISTS  watched_series ;

CREATE TABLE watched_series (
   username  varchar(45) NOT NULL,
   series_id  varchar(64) NOT NULL,
   date  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   season  int NOT NULL,
  PRIMARY KEY (username ,series_id),
  KEY  fkwsi_idx  (series_id),
  CONSTRAINT fkwsi FOREIGN KEY (series_id) REFERENCES Series (series_id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT fkwsus FOREIGN KEY (username) REFERENCES User (username)
);


DELIMITER //

CREATE PROCEDURE procedure_review_series()
BEGIN
  select r.username, s.title, s.genre, r.rating, r.review, s.user_rating from Review_Series r, Series s where r.series_id = s.series_id;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE procedure_review_movie()
BEGIN
select r.username, m.title, m.genre, r.rating, r.review, m.user_rating from Review_Movies r, Movies m where r.movie_id = m.movie_id;
END //
DELIMITER ; 