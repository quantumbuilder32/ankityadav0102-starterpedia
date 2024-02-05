CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"link" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"approved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources_to_categories" (
	"resource_id" serial NOT NULL,
	"category_name" text NOT NULL,
	CONSTRAINT "resources_to_categories_resource_id_category_name_pk" PRIMARY KEY("resource_id","category_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources_to_tags" (
	"resource_id" serial NOT NULL,
	"tag_name" text NOT NULL,
	CONSTRAINT "resources_to_tags_resource_id_tag_name_pk" PRIMARY KEY("resource_id","tag_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"user_name" text NOT NULL,
	"bio" text,
	"role" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_bookmarks" (
	"userId" text NOT NULL,
	"resource_id" serial NOT NULL,
	CONSTRAINT "users_to_bookmarks_userId_resource_id_pk" PRIMARY KEY("userId","resource_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "resource_index_two" ON "resources_to_categories" ("resource_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_index" ON "resources_to_categories" ("category_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "resource_index" ON "resources_to_tags" ("resource_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_index" ON "resources_to_tags" ("tag_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_index" ON "user" ("user_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_index" ON "user" ("id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources" ADD CONSTRAINT "resources_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources_to_categories" ADD CONSTRAINT "resources_to_categories_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources_to_categories" ADD CONSTRAINT "resources_to_categories_category_name_categories_name_fk" FOREIGN KEY ("category_name") REFERENCES "categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources_to_tags" ADD CONSTRAINT "resources_to_tags_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources_to_tags" ADD CONSTRAINT "resources_to_tags_tag_name_tags_name_fk" FOREIGN KEY ("tag_name") REFERENCES "tags"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_bookmarks" ADD CONSTRAINT "users_to_bookmarks_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_bookmarks" ADD CONSTRAINT "users_to_bookmarks_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
