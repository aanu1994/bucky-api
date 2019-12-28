CREATE TABLE clients(
   id INT NOT NULL AUTO_INCREMENT,
   firstname VARCHAR(100) NOT NULL,
   lastname VARCHAR(100) NOT NULL,
   dob DATE,
   email VARCHAR(100) NOT NULL,
   address1 VARCHAR(100) NOT NULL,
   address2 VARCHAR(100) NOT NULL,
   city VARCHAR(100) NOT NULL,
   postcode VARCHAR(100) NOT NULL,
   country VARCHAR(100) NOT NULL,
   PRIMARY KEY ( id )
);

CREATE TABLE spending(
   id INT NOT NULL AUTO_INCREMENT,
   clientId VARCHAR(100) NOT NULL,
   amount VARCHAR(100) NOT NULL,
   date DATE,
   PRIMARY KEY ( id )
);

CREATE TABLE clientIncome(
   id INT NOT NULL AUTO_INCREMENT,
   clientId VARCHAR(100) NOT NULL,
   salary VARCHAR(100) NOT NULL,
   date DATE,
   PRIMARY KEY ( id )
);

INSERT INTO `clients` (`id`, `firstname`, `lastname`, `dob`, `email`, `address1`, `address2`, `city`, `postcode`, `country`)
VALUES
	(1, 'Lewis', 'Murphy', '1988-02-17', 'lewis.murphy81@foobarmail.com', '18 Method Road', '', 'Swansea', 'S18 4JR', 'United Kingdom');

INSERT INTO `clientIncome` (`id`, `clientId`, `salary`, `date`)
VALUES
	(1, '1', '45000', '2019-12-28');

INSERT INTO `spending` (`id`, `clientId`, `amount`, `date`)
VALUES
	(1, '1', '100', '2019-05-24');
