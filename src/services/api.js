// Backend boundary for the next phase.
// Keep provider/database secrets out of the browser.
export const api={
  async getCurrentMember(){throw new Error('Database integration is intentionally deferred to the next phase.')}
};
