CREATE TABLE `organizations` (
	`name` text,
	`shortCode` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
--> statement-breakpoint
CREATE TABLE `organizationUsers` (
	`organizationId` integer,
	`userId` integer,
	`isDefault` integer,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`userName` text,
	`email` text,
	`mobileNumber` text,
	`password` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);

