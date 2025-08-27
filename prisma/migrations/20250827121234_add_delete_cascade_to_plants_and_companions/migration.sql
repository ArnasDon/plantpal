-- DropForeignKey
ALTER TABLE "public"."plant" DROP CONSTRAINT "plant_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."plant_companion" DROP CONSTRAINT "plant_companion_companionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."plant_companion" DROP CONSTRAINT "plant_companion_plantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."watering" DROP CONSTRAINT "watering_plantId_fkey";

-- AddForeignKey
ALTER TABLE "public"."plant" ADD CONSTRAINT "plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plant_companion" ADD CONSTRAINT "plant_companion_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plant_companion" ADD CONSTRAINT "plant_companion_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "public"."plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."watering" ADD CONSTRAINT "watering_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
