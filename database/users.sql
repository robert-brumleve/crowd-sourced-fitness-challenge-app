SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- Table `Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`UserID`, `created_at`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)


-- -----------------------------------------------------
-- Table `Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Challenges` (
  `ChallengeID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `description` VARCHAR(1024) NOT NULL,
  `difficulty` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`ChallengeID`))


-- -----------------------------------------------------
-- Table `Users_has_Challenges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users_has_Challenges` (
  `Users_UserID` INT NOT NULL,
  `Challenges_ChallengeID` INT NOT NULL,
  PRIMARY KEY (`Users_UserID`, `Challenges_ChallengeID`),
  INDEX `fk_Users_has_Challenges_Challenges1_idx` (`Challenges_ChallengeID` ASC) VISIBLE,
  INDEX `fk_Users_has_Challenges_Users_idx` (`Users_UserID` ASC) VISIBLE,
  CONSTRAINT `fk_Users_has_Challenges_Users`
    FOREIGN KEY (`Users_UserID`)
    REFERENCES `Users` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Challenges_Challenges1`
    FOREIGN KEY (`Challenges_ChallengeID`)
    REFERENCES `Challenges` (`ChallengeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
