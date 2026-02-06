<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) 
        {
            $table->id();
            $table->foreignId('place_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('description');
            $table->string('location');
            $table->string('imagen')->nullable();
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->decimal('distance', 8, 2)->nullable(); // km
            $table->integer('duration')->nullable(); // segundos
            $table->decimal('avg_speed', 5, 2)->nullable(); // km/h
            $table->integer('elevation_gain')->nullable(); // metros
            $table->json('track_points')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
