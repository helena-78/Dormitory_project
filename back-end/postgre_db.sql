CREATE TABLE IF NOT EXISTS "admin" (
	"admin_id" bigint NOT NULL,
	"admin_password" text NOT NULL CHECK (length(admin_password) >= 8),
	"admin_name" text NOT NULL,
	PRIMARY KEY ("admin_id")
);

CREATE TABLE IF NOT EXISTS "student" (
	"student_id" bigint NOT NULL,
	"name" text NOT NULL,
	"surname" text NOT NULL,
	"email" text NOT NULL UNIQUE CHECK (length(email) <= 255),
	"contact_number" bigint CHECK (length(contact_number::text) >= 10),
	"gender" text CHECK (gender IN ('Male', 'Female')),
	"room_id" bigint,
	"application_id" bigint,
	"password" text NOT NULL CHECK (length(password) >= 8),
	PRIMARY KEY ("student_id")
);

CREATE TABLE IF NOT EXISTS "room" (
	"room_id" bigint NOT NULL,
	"number" bigint NOT NULL UNIQUE,
	"available_places" bigint NOT NULL CHECK (available_places >= 0),
	"images" bytea,
	"price" numeric(10,0) NOT NULL CHECK (price >= 0),
	"gender" text NOT NULL CHECK (gender IN ('Male', 'Female')),
	PRIMARY KEY ("room_id")
);

CREATE TABLE IF NOT EXISTS "payment" (
	"payment_id" bigint NOT NULL,
	"student_id" bigint,
	"status" text NOT NULL CHECK (status IN ('Paid', 'Pending', 'Overdue')),
	"receipt" bytea NOT NULL,
	"date" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("payment_id")
);

CREATE TABLE IF NOT EXISTS "bill" (
	"bill_id" bigint NOT NULL,
	"student_id" bigint NOT NULL,
	"amount" numeric(10,0) NOT NULL CHECK (amount > 0),
	"due_date" timestamp with time zone NOT NULL,
	"status" text NOT NULL CHECK (status IN ('Paid', 'Pending', 'Overdue')),
	PRIMARY KEY ("bill_id")
);

CREATE TABLE IF NOT EXISTS "applications" (
	"application_id" bigint NOT NULL,
	"student_id" bigint,
	"room_id" bigint,
	"status" text NOT NULL CHECK (status IN ('Submitted', 'Approved', 'Rejected')),
	"application_date" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"desired_roommates" text,
	PRIMARY KEY ("application_id")
);

CREATE TABLE IF NOT EXISTS "invitations" (
	"invitation_id" bigint NOT NULL,
	"application_id" bigint,
	"sent_date" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"expiry_date" timestamp with time zone NOT NULL,
	"status" text NOT NULL CHECK (status IN ('Sent', 'Accepted', 'Declined', 'Expired')),
	PRIMARY KEY ("invitation_id")
);

CREATE TABLE IF NOT EXISTS "bookings" (
	"booking_id" bigint NOT NULL,
	"student_id" bigint,
	"room_id" bigint,
	"booking_date" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"confirmation_status" text NOT NULL CHECK (confirmation_status IN ('Confirmed', 'Pending', 'Cancelled')),
	PRIMARY KEY ("booking_id")
);

ALTER TABLE "student" ADD CONSTRAINT "student_fk6" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "student" ADD CONSTRAINT "student_fk7" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "payment" ADD CONSTRAINT "payment_fk1" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "bill" ADD CONSTRAINT "bill_fk1" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "applications" ADD CONSTRAINT "applications_fk1" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "applications" ADD CONSTRAINT "applications_fk2" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_fk1" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_fk1" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_fk2" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;
