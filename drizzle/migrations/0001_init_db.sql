CREATE TABLE `items` (
	`name` text,
	`description` text,
	`image` text,
	`status` text,
	`preference` text,
	`amount` text,
	`type` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`orderId` text,
	`status` text,
	`locationId` integer,
	`totalAmount` real,
	`customerId` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
--> statement-breakpoint
CREATE TABLE `orderLines` (
	`orderId` text,
	`seatId` integer,
	`itemId` text,
	`Preference` text,
	`locationId` integer,
	`quantity` real,
	`amount` real,
	`status` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
