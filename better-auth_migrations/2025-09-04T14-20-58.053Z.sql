alter table "users" add column "emailVerified" boolean default false not null;

alter table "users" add column "image" text;

alter table "users" add column "createdAt" timestamp default CURRENT_TIMESTAMP not null;

alter table "users" add column "updatedAt" timestamp default CURRENT_TIMESTAMP not null;

create table "sessions" ("id" serial not null primary key, "expiresAt" timestamp not null, "token" text not null unique, "createdAt" timestamp default CURRENT_TIMESTAMP not null, "updatedAt" timestamp not null, "ipAddress" text, "userAgent" text, "userId" serial not null references "users" ("id") on delete cascade);

create table "accounts" ("id" serial not null primary key, "accountId" text not null, "providerId" text not null, "userId" serial not null references "users" ("id") on delete cascade, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" timestamp, "refreshTokenExpiresAt" timestamp, "scope" text, "password" text, "createdAt" timestamp default CURRENT_TIMESTAMP not null, "updatedAt" timestamp not null);

create table "verifications" ("id" serial not null primary key, "identifier" text not null, "value" text not null, "expiresAt" timestamp not null, "createdAt" timestamp default CURRENT_TIMESTAMP not null, "updatedAt" timestamp default CURRENT_TIMESTAMP not null);
