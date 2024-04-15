import { relations } from "drizzle-orm";
import {
  date,
  text,
  pgTable,
  varchar,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  address: varchar("address", { length: 256 }).notNull().unique(),
  rank: text("rank"),
  x: varchar("x"),
  site: varchar("site"),
  discord: varchar("discord"),
  timezone: varchar("timeozone"),
  about: varchar("about", { length: 256 }),
  createdAt: date("created_at").default("NOW()"),
});

export const userRelations = relations(user, ({ many }) => ({
  followers: many(userToFollowers, { relationName: "followers" }),
  following: many(userToFollowers, { relationName: "following" }),
  // posts: many(post, {
  //   relationName: "posts"
  // }),
}));

export const userToFollowers = pgTable(
  "user_to_followers",
  {
    followingAddress: text("following_address")
      .references(() => user.address)
      .notNull(),
    followerAddress: text("follower_address")
      .references(() => user.address)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.followingAddress, t.followerAddress] }),
  }),
);

export const userToFollowersRelations = relations(
  userToFollowers,
  ({ one }) => ({
    following: one(user, {
      fields: [userToFollowers.followingAddress],
      references: [user.address],
      relationName: "following",
    }),
    follower: one(user, {
      fields: [userToFollowers.followerAddress],
      references: [user.address],
      relationName: "follower",
    }),
  }),
);

// export const post = pgTable("post", {
//   id: serial("id").primaryKey(),
//   body: varchar("body", { length: 256 }).notNull(),
//   imgs: varchar("imgs", { length: 256 }).array(),
//   reposted: boolean("reposted").notNull(),
//   createdAt: date("created_at").default("NOW()"),
// });

// export const postRelations = relations(post, ({ one, many }) => ({
//   userId: one(user),
//   quoted: many(post),
//   quotes: one(post),
//   likes: many(user)
// }));

export const insertUserSchema = createInsertSchema(user, {});
