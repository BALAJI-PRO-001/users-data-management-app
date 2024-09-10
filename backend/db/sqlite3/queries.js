
const CREATE_USERS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS USERS (
                                 ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                 NAME VARCHAR(50) NOT NULL,
                                 PHONE_NO INT UNIQUE NOT NULL,
                                 ADDRESS VARCHAR(255) NOT NULL,
                                 COW_NAME VARCHAR(100) NOT NULL,
                                 COW_BREED VARCHAR(100) NOT NULL,
                                 BULL_NAME VARCHAR(100) NOT NULL,
                                 AI_DATE VARCHAR(50) NOT NULL,
                                 INJECTION_COST INT NOT NULL,
                                 DATE_AND_TIME DATETIME DEFAULT CURRENT_TIMESTAMP
                               )`.toLowerCase();

const INSERT_USER_RECORDS_SQL = `INSERT INTO USERS (NAME, PHONE_NO, ADDRESS, COW_NAME, BREED, BULL_NAME, AI_DATE, INJECTION_COST) VALUES (?, ?, ?, ?, ?, ?, ?, ?)` .toLowerCase();
const SELECT_ALL_USERS_SQL = "SELECT * FROM USERS";
const SELECT_USER_SQL = "SELECT * FROM USERS WHERE ID = ?";

module.exports = {
   CREATE_USERS_TABLE_SQL,
   INSERT_USER_RECORDS_SQL,
   SELECT_ALL_USERS_SQL,
   SELECT_USER_SQL
};