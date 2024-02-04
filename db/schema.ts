import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, primaryKey, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users",
    {
        id: integer("id").primaryKey(),
        name: text("name").notNull(),
        userName: text("user_name").notNull().unique(),
        bio: text("bio"),
        role: text("password"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => {
        return {
            usernameIndex: index("username_index").on(table.userName),
        };
    }
);


export const usersRelations = relations(users, ({ many }) => ({
    resourcesPosted: many(resources),
    bookmarks: many(usersToBookmarks),
}));










export const resources = pgTable("resources",
    {
        id: integer("id").primaryKey(),
        authorId: integer("author_id").references(() => users.id),
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
        fields: [resources.authorId],
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
    userId: integer('user_id').notNull().references(() => users.id),
    resourceId: integer('resource_id').notNull().references(() => resources.id),
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
    resourceId: integer('resource_id').notNull().references(() => resources.id),
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
    resourceId: integer('resource_id').notNull().references(() => resources.id),
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