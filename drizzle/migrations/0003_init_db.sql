ALTER TABLE `organizationUsers` ADD `userName` text;--> statement-breakpoint
ALTER TABLE `users` ADD `name` text;--> statement-breakpoint
ALTER TABLE `organizationUsers` DROP COLUMN `userId`;