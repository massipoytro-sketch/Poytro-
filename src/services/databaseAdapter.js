export const databaseAdapter={
  status:'not-connected-in-redesign',
  note:'Reserved for the existing database. This phase must not alter its schema.',
  async getSession(){return null},
  async getProfile(){return null},
  async getWallet(){return null}
};
