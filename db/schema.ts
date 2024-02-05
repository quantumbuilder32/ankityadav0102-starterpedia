import { relations } from "drizzle-orm";
import { boolean, index, pgTable, primaryKey, integer, serial, text, timestamp, } from "drizzle-orm/pg-core";
import type { AdapterAccount } from '@auth/core/adapters'




export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),

    // userName: text("user_name").notNull().unique(),
    // bio: text("bio"),
    // role: text("password"),
    // createdAt: timestamp("created_at").defaultNow().notNull(),
},
    (table) => {
        return {
            // usernameIndex: index("username_index").on(table.userName),
        };
    })


export const usersRelations = relations(users, ({ many }) => ({
    resourcesPosted: many(resources),
    bookmarks: many(usersToBookmarks),
}));











export const accounts = pgTable("account",
    {
        userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
)










export const resources = pgTable("resources",
    {
        id: serial("id").primaryKey(),
        userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        link: text("link").notNull(),
        description: text("description"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        approved: boolean("approved").default(false).notNull(),
    },
    (table) => {
        return {
        };
    }
);


export const resourcesRelations = relations(resources, ({ one, many }) => ({
    author: one(users, {
        fields: [resources.userId],
        references: [users.id],
    }),
    tags: many(resourcesToTags),
    categories: many(resourcesToCategories),
    usersThatBookmarked: many(usersToBookmarks),
}));







export const categories = pgTable("categories",
    {
        name: text("name").primaryKey().notNull(),
    },
    (table) => {
        return {
        };
    }
);


export const categoriesRelations = relations(categories, ({ many }) => ({
    resources: many(resourcesToCategories)
}));














export const tags = pgTable("tags",
    {
        name: text("name").primaryKey().notNull(),
    },
    (table) => {
        return {
        };
    }
);


export const tagsRelations = relations(tags, ({ many }) => ({
    resources: many(resourcesToTags),
}));















//many to many junction tables

export const usersToBookmarks = pgTable('users_to_bookmarks', {
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    resourceId: serial('resource_id').notNull().references(() => resources.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.userId, t.resourceId] }),
}),
);


export const usersToBookmarksRelations = relations(usersToBookmarks, ({ one }) => ({
    user: one(users, {
        fields: [usersToBookmarks.userId],
        references: [users.id],
    }),
    resource: one(resources, {
        fields: [usersToBookmarks.resourceId],
        references: [resources.id],
    }),
}));













export const resourcesToTags = pgTable('resources_to_tags', {
    resourceId: serial('resource_id').notNull().references(() => resources.id),
    tagName: text('tag_name').notNull().references(() => tags.name),
}, (t) => ({
    pk: primaryKey({ columns: [t.resourceId, t.tagName] }),
    resourceIdx: index("resource_index").on(t.resourceId),
    tagIdx: index("tag_index").on(t.tagName),
}),
);


export const resourcesToTagsRelations = relations(resourcesToTags, ({ one }) => ({
    tag: one(tags, {
        fields: [resourcesToTags.tagName],
        references: [tags.name],
    }),
    resource: one(resources, {
        fields: [resourcesToTags.resourceId],
        references: [resources.id],
    }),
}));

















export const resourcesToCategories = pgTable('resources_to_categories', {
    resourceId: serial('resource_id').notNull().references(() => resources.id),
    categoryName: text('category_name').notNull().references(() => categories.name),
}, (t) => ({
    pk: primaryKey({ columns: [t.resourceId, t.categoryName] }),
    resourceIdx: index("resource_index_two").on(t.resourceId),
    categoryIdx: index("category_index").on(t.categoryName),
}),
);


export const resourcesToCategoriesRelations = relations(resourcesToCategories, ({ one }) => ({
    resource: one(resources, {
        fields: [resourcesToCategories.resourceId],
        references: [resources.id],
    }),
    category: one(categories, {
        fields: [resourcesToCategories.categoryName],
        references: [categories.name],
    }),
}));