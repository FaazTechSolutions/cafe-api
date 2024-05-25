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
