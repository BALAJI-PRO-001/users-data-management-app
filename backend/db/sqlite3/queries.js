
const CREATE_USERS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS USERS (
                                 ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                 NAME VARCHAR(50) NOT NULL,
                                 PHONE_NUMBER INT UNIQUE NOT NULL,
                                 ADDRESS VARCHAR(255) NOT NULL,
                                 IS_CURRENT_USER BOOLEAN DEFAULT TRUE,
                                 DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME'))
                               )`.toLowerCase();

const INSERT_USER_RECORDS_SQL = `INSERT INTO USERS (NAME, PHONE_NUMBER, ADDRESS) VALUES (?, ?, ?)` .toLowerCase();
const SELECT_ALL_USERS_SQL = "SELECT * FROM USERS".toLowerCase();
const SELECT_USER_BY_ID_SQL = "SELECT * FROM USERS WHERE ID = ?".toLowerCase();
const SELECT_USER_BY_PHONE_NUMBER_SQL = "SELECT * FROM USERS WHERE PHONE_NUMBER = ?".toLowerCase();
const UPDATE_USER_BY_ID_SQL = "UPDATE USERS SET <COLUMN_NAME> = ? WHERE ID = ?".toLowerCase();
const DELETE_USER_BY_ID_SQL = "DELETE FROM USERS WHERE ID = ?".toLowerCase();
const DELETE_ALL_USERS_SQL = "DELETE FROM USERS".toLowerCase();
const SELECT_LAST_USER_SQL = "SELECT * FROM USERS WHERE ID = (SELECT MAX(ID) FROM USERS)".toLowerCase();


const CREATE_COWS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS COWS (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                USER_ID INTEGER NOT NULL,
                                COW_NAME VARCHAR(100) NOT NULL,
                                COW_BREED VARCHAR(100) NOT NULL,
                                BULL_NAME VARCHAR(100) NOT NULL,
                                DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME')),
                                FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
                              )`.toLowerCase();

const INSERT_COW_RECORDS_SQL = "INSERT INTO COWS (USER_ID, COW_NAME, COW_BREED, BULL_NAME) VALUES (?, ?, ?, ?)".toLowerCase();
const SELECT_LAST_COW_SQL = "SELECT * FROM COWS WHERE ID = (SELECT MAX(ID) FROM COWS)".toLowerCase()
const DELETE_ALL_COWS_SQL = "DELETE FROM COWS".toLowerCase();
const SELECT_ALL_COWS_WITH_INJECTION_COST_AND_AI_DATE_SQL = "SELECT * FROM COWS INNER JOIN INJECTION_COST_AND_AI_DATE ON COWS.ID = INJECTION_COST_AND_AI_DATE.COW_ID".toLowerCase();


const CREATE_INJECTION_COST_AND_AI_DATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS INJECTION_COSTS_AND_AI_DATES (
                                                      ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                                      COW_ID INTEGER NOT NULL,
                                                      COST DECIMAL(10, 2) NOT NULL,
                                                      DATE VARCHAR(20) NOT NULL,
                                                      DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME')),
                                                      FOREIGN KEY (COW_ID) REFERENCES COWS(ID)                                                     
                                                    )`.toLowerCase();         
                                                    
const INSERT_INJECTION_COST_AND_AI_DATE_SQL = "INSERT INTO INJECTION_COSTS_AND_AI_DATES (COW_ID, COST, DATE) VALUES (?, ?, ?)";
const SELECT_LAST_INJECTION_COST_AND_AI_DATE_SQL = "SELECT * FROM INJECTION_COSTS_AND_AI_DATES  WHERE ID = (SELECT MAX(ID) FROM INJECTION_COSTS_AND_AI_DATES)".toLowerCase()
const SELECT_INJECTION_COSTS_AND_AI_DATE_BY_COW_ID_SQL = "SELECT COST, DATE FROM INJECTION_COSTS_AND_AI_DATES WHERE COW_ID = ?".toLowerCase();
const DELETE_ALL_INJECTION_COSTS_AND_AI_DATES_SQL = "DELETE FROM INJECTION_COSTS_AND_AI_DATES".toLowerCase();


module.exports = {
   CREATE_USERS_TABLE_SQL,
   INSERT_USER_RECORDS_SQL,
   SELECT_ALL_USERS_SQL,
   SELECT_USER_BY_ID_SQL,
   UPDATE_USER_BY_ID_SQL,
   DELETE_USER_BY_ID_SQL,
   DELETE_ALL_USERS_SQL,
   SELECT_LAST_USER_SQL,
   SELECT_USER_BY_PHONE_NUMBER_SQL,

   CREATE_COWS_TABLE_SQL,
   INSERT_COW_RECORDS_SQL,
   SELECT_LAST_COW_SQL,
   DELETE_ALL_COWS_SQL,
   SELECT_ALL_COWS_WITH_INJECTION_COST_AND_AI_DATE_SQL,

   CREATE_INJECTION_COST_AND_AI_DATE_TABLE_SQL,
   INSERT_INJECTION_COST_AND_AI_DATE_SQL,
   SELECT_INJECTION_COSTS_AND_AI_DATE_BY_COW_ID_SQL,
   DELETE_ALL_INJECTION_COSTS_AND_AI_DATES_SQL,
   SELECT_LAST_INJECTION_COST_AND_AI_DATE_SQL,
};