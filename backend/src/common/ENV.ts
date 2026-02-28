import jetEnv, { num, str } from 'jet-env';

/******************************************************************************
                                 Setup
******************************************************************************/

const ENV = jetEnv({
  NodeEnv: str,
  Port: num,
  FrontendOrigin: str,

  MongodbUri: str,

  AccessTokenSecret: str,
  RefreshTokenSecret: str,
});


/******************************************************************************
                            Export default
******************************************************************************/

export default ENV;
