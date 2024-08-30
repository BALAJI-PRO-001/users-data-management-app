
const CREATE_USERS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS USERS (
                                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                  NAME VARCHAR(50) NOT NULL,
                                  PHONE_NO INT UNIQUE NOT NULL,
                                  ADDRESS VARCHAR(150) NOT NULL,
                                  COW_NAME VARCHAR(80) NOT NULL,
                                  BREED VARCHAR(80) NOT NULL,
                                  BULL_NAME VARCHAR(80) NOT NULL,
                                  AI_DATE VARCHAR(80) NOT NULL,
                                  INJECTION_COST VARCHAR(50) NOT NULL
                                  DATE_AND_TIME DATE 
                               )`;

                            