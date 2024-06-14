CREATE TABLE IF NOT EXISTS "admin" (
	"admin_id" bigint NOT NULL,
	"admin_password" text NOT NULL,
	"admin_name" text NOT NULL,
	PRIMARY KEY ("admin_id")
);

CREATE TABLE IF NOT EXISTS "student" (
	"student_id" bigint NOT NULL,
	"name" text NOT NULL,
	"surname" text NOT NULL,
	"email" text NOT NULL,
	"contact_number" bigint,
	"gender" text,
	"room_id" bigint,
	"application_id" bigint,
	"password" text NOT NULL,
	PRIMARY KEY ("student_id")
);

CREATE TABLE IF NOT EXISTS "room" (
	"room_id" bigint NOT NULL,
	"number" bigint NOT NULL,
	"available_places" bigint NOT NULL,
	"images" bytea,
	"price" numeric(10,0) NOT NULL,
	"gender" text NOT NULL,
	PRIMARY KEY ("room_id")
);

CREATE TABLE IF NOT EXISTS "payment" (
	"payment_id" bigint NOT NULL,
	"student_id" bigint,
	"status" text NOT NULL,
	"receipt" bytea NOT NULL,
	"date" timestamp with time zone NOT NULL,
	PRIMARY KEY ("payment_id")
);

CREATE TABLE IF NOT EXISTS "bill" (
	"bill_id" bigint NOT NULL,
	"student_id" bigint NOT NULL,
	"amount" numeric(10,0) NOT NULL,
	"due_date" timestamp with time zone NOT NULL,
	"status" text NOT NULL,
	PRIMARY KEY ("bill_id")
);

CREATE TABLE IF NOT EXISTS "applications" (
	"application_id" bigint NOT NULL,
	"student_id" bigint,
	"room_id" bigint,
	"status" text NOT NULL,
	"application_date" timestamp with time zone NOT NULL,
	"desired_roommates" text,
	PRIMARY KEY ("application_id")
);

CREATE TABLE IF NOT EXISTS "invitations" (
	"invitation_id" bigint NOT NULL,
	"application_id" bigint,
	"sent_date" timestamp with time zone NOT NULL,
	"expiry_date" timestamp with time zone NOT NULL,
	"status" text NOT NULL,
	PRIMARY KEY ("invitation_id")
);

CREATE TABLE IF NOT EXISTS "bookings" (
	"booking_id" bigint NOT NULL,
	"student_id" bigint,
	"room_id" bigint,
	"booking_date" timestamp with time zone NOT NULL,
	"confirmation_status" text NOT NULL,
	PRIMARY KEY ("booking_id")
);


ALTER TABLE "student" ADD CONSTRAINT "student_fk6" FOREIGN KEY ("room_id") REFERENCES "room"("room_id");

ALTER TABLE "student" ADD CONSTRAINT "student_fk7" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id");

ALTER TABLE "payment" ADD CONSTRAINT "payment_fk1" FOREIGN KEY ("student_id") REFERENCES "student"("student_id");
ALTER TABLE "bill" ADD CONSTRAINT "bill_fk1" FOREIGN KEY ("student_id") REFERENCES "student"("student_id");
ALTER TABLE "applications" ADD CONSTRAINT "applications_fk1" FOREIGN KEY ("student_id") REFERENCES "student"("student_id");

ALTER TABLE "applications" ADD CONSTRAINT "applications_fk2" FOREIGN KEY ("room_id") REFERENCES "room"("room_id");
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_fk1" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id");
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_fk1" FOREIGN KEY ("student_id") REFERENCES "student"("student_id");