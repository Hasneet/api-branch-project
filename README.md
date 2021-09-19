# api-branch-project

To run this project follow the steps below

STEP 1: run the following command in the root of the project `npm install`.
STEP 2: run the following command in the root of the project `npm start`.


DATABSE SCHEMA COMMANDS

create table

CREATE TABLE `Queries` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `User_Id` int NOT NULL,
  `Assignee` int DEFAULT NULL,
  `Created_At` datetime DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Querie_Subject` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) 

CREATE TABLE `QueryMessages` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Query_Id` int NOT NULL,
  `Created_At` datetime DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Msg` varchar(250) NOT NULL,
  `Msg_Type` varchar(20) DEFAULT 'QUERY',
  `Assignee_Id` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
)
