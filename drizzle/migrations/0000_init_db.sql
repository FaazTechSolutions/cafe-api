CREATE TABLE `employees` (
	`employeeId` text,
	`employeeName` text,
	`profession` text,
	`mobileNumber` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
--> statement-breakpoint
CREATE TABLE `items` (
	`name` text,
	`description` text,
	`image` text,
	`status` text,
	`preference` text,
	`amount` real,
	`type` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`name` text,
	`status` text,
	`image` text,
	`officeBoy` text,
	`officeBoyMobile` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
--> statement-breakpoint
CREATE TABLE `locationSeats` (
	`locationId` integer,
	`seatId` integer,
	`seatNo` text,
	`orderUrl` text,
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
--> statement-breakpoint
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
	`userName` text,
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
	`name` text,
	`email` text,
	`mobileNumber` text,
	`password` text,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdOn` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`createdBy` text,
	`updatedOn` integer,
	`updatedby` text
);
