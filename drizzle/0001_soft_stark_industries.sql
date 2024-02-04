CREATE INDEX IF NOT EXISTS "resource_index_two" ON "resources_to_categories" ("resource_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_index" ON "resources_to_categories" ("category_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "resource_index" ON "resources_to_tags" ("resource_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tag_index" ON "resources_to_tags" ("tag_name");