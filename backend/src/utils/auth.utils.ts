import { User } from '@src/models/user.model.js';
import argon2 from 'argon2';
import bcrypt from 'bcrypt';

export async function handleHashMigration(userId: string, password: string) {
  const user = await User.findById(userId);
  if (!user?.hasLegacyHashing) return;

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) return;

  const newHash = await argon2.hash(password);

  user.password = newHash;
  user.hasLegacyHashing = false;

  await user.save();
}
