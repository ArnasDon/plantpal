-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plant" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wateringFrequencyOverride" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plant_companion" (
    "plantId" TEXT NOT NULL,
    "companionId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "plant_companion_pkey" PRIMARY KEY ("plantId","companionId")
);

-- CreateTable
CREATE TABLE "public"."species" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wateringFrequencyDays" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "tips" TEXT,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."watering" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "wateredAt" INTEGER NOT NULL,

    CONSTRAINT "watering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "plant_companion_plantId_companionId_key" ON "public"."plant_companion"("plantId", "companionId");

-- CreateIndex
CREATE UNIQUE INDEX "species_name_key" ON "public"."species"("name");

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plant" ADD CONSTRAINT "plant_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "public"."species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plant" ADD CONSTRAINT "plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plant_companion" ADD CONSTRAINT "plant_companion_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plant_companion" ADD CONSTRAINT "plant_companion_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "public"."plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."watering" ADD CONSTRAINT "watering_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
