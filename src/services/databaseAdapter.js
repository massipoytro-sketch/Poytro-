import { requireSupabase, supabaseConfigured } from './supabaseClient';

const TABLES = ['profiles', 'wallets', 'offers', 'conversions', 'daily_rewards', 'points_transactions', 'referrals', 'withdrawals'];

const first = (row, keys, fallback = null) => {
  for (const key of keys) {
    if (row && row[key] !== undefined && row[key] !== null) return row[key];
  }
  return fallback;
};

async function rows(table, userId = null) {
  const client = requireSupabase();
  let query = client.from(table).select('*');
  if (userId) {
    const filters = ['user_id', 'profile_id', 'member_id'];
    // Try the canonical user_id filter first. If the table does not expose it,
    // fall back to an unfiltered read so a schema mismatch never crashes the app.
    const result = await query.eq('user_id', userId);
    if (!result.error) return result.data || [];
    const fallback = await client.from(table).select('*');
    if (fallback.error) throw fallback.error;
    return fallback.data || [];
  }
  const result = await query;
  if (result.error) throw result.error;
  return result.data || [];
}

export const databaseAdapter = {
  status: supabaseConfigured ? 'configured' : 'missing-env',
  tables: TABLES,

  async getSession() {
    const client = requireSupabase();
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async signIn(email, password) {
    const client = requireSupabase();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signUp(email, password, metadata = {}) {
    const client = requireSupabase();
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const client = requireSupabase();
    const { error } = await client.auth.signOut();
    if (error) throw error;
  },

  async getProfile(userId) {
    const data = await rows('profiles', userId);
    return data[0] || null;
  },

  async getWallet(userId) {
    const data = await rows('wallets', userId);
    return data[0] || null;
  },

  async getMemberData(userId) {
    const [profile, wallet, offers, conversions, dailyRewards, transactions, referrals, withdrawals] = await Promise.all([
      this.getProfile(userId),
      this.getWallet(userId),
      rows('offers'),
      rows('conversions', userId),
      rows('daily_rewards', userId),
      rows('points_transactions', userId),
      rows('referrals', userId),
      rows('withdrawals', userId),
    ]);

    return { profile, wallet, offers, conversions, dailyRewards, transactions, referrals, withdrawals };
  },

  async getAllPublicOffers() {
    return rows('offers');
  },

  normalizeOffer(row) {
    return {
      ...row,
      brand: first(row, ['brand', 'provider', 'name', 'title'], 'Offer'),
      title: first(row, ['title', 'description', 'name'], 'Complete this offer'),
      reward: Number(first(row, ['reward', 'points', 'coins', 'amount'], 0)) || 0,
      tag: first(row, ['tag', 'category', 'type'], 'Available'),
      icon: first(row, ['icon', 'logo'], '✦'),
      tone: first(row, ['tone', 'theme'], 'blue'),
    };
  },

  normalizeProfile(row) {
    return {
      ...row,
      name: first(row, ['name', 'full_name', 'username', 'display_name'], 'Member'),
      email: first(row, ['email'], ''),
      avatar: first(row, ['avatar_url', 'avatar'], null),
    };
  },

  normalizeWallet(row) {
    return {
      ...row,
      balance: Number(first(row, ['balance', 'points', 'coins'], 0)) || 0,
      pending: Number(first(row, ['pending', 'pending_points', 'pending_coins'], 0)) || 0,
      lifetime: Number(first(row, ['lifetime', 'lifetime_earnings', 'total_earned', 'total_points'], 0)) || 0,
    };
  },
};
