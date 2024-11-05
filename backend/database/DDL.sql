SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- Table `Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)


-- -----------------------------------------------------
-- Table `Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Challenges` (
  `challengeID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `description` VARCHAR(1024) NOT NULL,
  `difficulty` VARCHAR(8) NOT NULL,
  `creatorID` INT NOT NULL,
  `created_at` TIMESTAMP(6) NOT NULL,
  `imageURL` VARCHAR(1024) NULL,
  PRIMARY KEY (`challengeID`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)


-- -----------------------------------------------------
-- Table `Users_has_Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users_has_Challenges` (
  `userID` INT NOT NULL,
  `challengeID` INT NOT NULL,
  PRIMARY KEY (`userID`, `challengeID`),
  INDEX `fk_Users_has_Challenges_Challenges1_idx` (`challengeID` ASC) VISIBLE,
  INDEX `fk_Users_has_Challenges_Users_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Challenges_Users`
    FOREIGN KEY (`userID`)
    REFERENCES `Users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Challenges_Challenges1`
    FOREIGN KEY (`challengeID`)
    REFERENCES `Challenges` (`challengeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)


-- -----------------------------------------------------
-- Table `Badges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Badges` (
  `badgeID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `challengeID` INT NOT NULL,
  PRIMARY KEY (`badgeID`, `challengeID`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_Badges_Challenges1_idx` (`challengeID` ASC) VISIBLE,
  CONSTRAINT `fk_Badges_Challenges1`
    FOREIGN KEY (`challengeID`)
    REFERENCES `Challenges` (`challengeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)


-- -----------------------------------------------------
-- Table `Users_has_Badges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users_has_Badges` (
  `userID` INT NOT NULL,
  `badgeID` INT NOT NULL,
  PRIMARY KEY (`userID`, `badgeID`),
  INDEX `fk_Users_has_Badges_Badges1_idx` (`badgeID` ASC) VISIBLE,
  INDEX `fk_Users_has_Badges_Users1_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Badges_Users1`
    FOREIGN KEY (`userID`)
    REFERENCES `Users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Badges_Badges1`
    FOREIGN KEY (`badgeID`)
    REFERENCES `Badges` (`badgeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
