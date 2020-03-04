 --Create contactus table 
create table tbl_contactus(
id serial not null primary key,
fname varchar(100),
lname varchar(100),
email varchar(100),
enquiry_type varchar(100),
message text,
"createdAt" timestamp with time zone NOT NULL,
"updatedAt" timestamp with time zone NOT NULL
)

-- after created table insert the SequelizeMeta table migration name with full code name like this - 20200303075808-create-tbl-contactus.js
-- becz db-migrate not work properly thats why used this....
insert into  "SequelizeMeta" (name) values('20200303075808-create-tbl-contactus.js');